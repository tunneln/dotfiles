" vimtex - LaTeX plugin for Vim
"
" Maintainer: Karl Yngve Lervåg
" Email:      karl.yngve@gmail.com
"

" {{{1 Script Initialization

"
" The flag s:initialized is set to 1 after vimtex has been initialized to
" prevent errors if the scripts are loaded more than once (e.g. when opening
" more than one LaTeX buffer in one vim instance).  Thus it allows us to
" distinguish between global initialization and buffer initialization.
"
if !exists('s:initialized')
  let s:initialized = 0
endif

"
" Define list of vimtex modules
"
if !exists('s:modules')
  let s:modules = map(
        \ split(
        \   globpath(
        \     fnamemodify(expand('<sfile>'), ':r'),
        \     '*.vim'),
        \   '\n'),
        \ 'fnamemodify(v:val, '':t:r'')')
endif

" }}}1

function! vimtex#init() " {{{1
  call s:check_version()
  "
  " First initialize buffer options and construct (if necessary) the vimtex
  " data blob.
  "
  call s:init_buffer()

  "
  " Then we initialize the modules.  This is done in three steps:
  "
  " 1. Initialize options (load default options if not otherwise set).  This is
  "    only done once for each vim session.
  "
  " 2. Initialize module scripts (set script variables and similar).  This is
  "    also only done once for each vim session.
  "
  " 3. Initialize module for current buffer.  This is done for each new LaTeX
  "    buffer.
  "
  if !s:initialized
    call s:init_modules('options')
    call s:init_modules('script')
  endif
  call s:init_modules('buffer')

  "
  " Initialize local blob (if main file is different then current file)
  "
  call s:init_local_blob()

  "
  " Finally we create the mappings
  "
  call s:init_mappings()

  let s:initialized = 1

  "
  " Allow custom configuration through an event hook
  "
  if exists('#User#VimtexEventInitPost')
    doautocmd User VimtexEventInitPost
  endif
endfunction

" }}}1
function! vimtex#info(global) " {{{1
  if !s:initialized
    echoerr 'Error: vimtex has not been initialized!'
    return
  endif

  if a:global
    for [id, data] in items(g:vimtex_data)
      let d = deepcopy(data)
      for f in ['aux', 'out', 'log']
        silent execute 'let d.' . f . ' = data.' . f . '()'
      endfor

      call vimtex#echo#formatted([
            \ "\ng:vimtex_data[", ['VimtexSuccess', id], '] : ',
            \ ['VimtexSuccess', remove(d, 'name') . "\n"]])
      call s:print_dict(d)
    endfor
  else
    let d = deepcopy(b:vimtex)
    for f in ['aux', 'out', 'log']
      silent execute 'let d.' . f . ' = b:vimtex.' . f . '()'
    endfor
    call vimtex#echo#formatted([
          \ 'b:vimtex : ',
          \ ['VimtexSuccess', remove(d, 'name') . "\n"]])
    call s:print_dict(d)
  endif
endfunction

" }}}1
function! vimtex#wc(detailed) " {{{1
  " Run texcount, save output to lines variable
  let cmd  = 'cd ' . vimtex#util#shellescape(b:vimtex.root)
  let cmd .= '; texcount -nosub -sum '
  let cmd .= a:detailed > 0 ? '-inc ' : '-merge '
  let cmd .= vimtex#util#shellescape(b:vimtex.base)
  let lines = split(system(cmd), '\n')

  " Create wordcount window
  if bufnr('TeXcount') >= 0
    bwipeout TeXcount
  endif
  split TeXcount

  " Add lines to buffer
  for line in lines
    call append('$', printf('%s', line))
  endfor
  0delete _

  " Set mappings
  nnoremap <buffer> <silent> q :bwipeout<cr>

  " Set buffer options
  setlocal bufhidden=wipe
  setlocal buftype=nofile
  setlocal cursorline
  setlocal nobuflisted
  setlocal nolist
  setlocal nospell
  setlocal noswapfile
  setlocal nowrap
  setlocal tabstop=8
  setlocal nomodifiable

  " Set highlighting
  syntax match TexcountText  /^.*:.*/ contains=TexcountValue
  syntax match TexcountValue /.*:\zs.*/
  highlight link TexcountText  VimtexMsg
  highlight link TexcountValue Constant
endfunction

" }}}1
" {{{1 function! vimtex#reload()
let s:file = expand('<sfile>')

if !exists('s:reloading_script')
  function! vimtex#reload()
    let s:reloading_script = 1

    let l:scripts = [s:file]
          \ + map(copy(s:modules),
          \ 'fnamemodify(s:file, '':h'') . ''/vimtex/'' . v:val . ''.vim''')

    for l:file in l:scripts
      execute 'source' l:file
    endfor

    let s:initialized = 0
    call vimtex#init()

    " Reload indent file
    if exists('b:did_vimtex_indent')
      unlet b:did_indent
      runtime indent/tex.vim
    endif

    call vimtex#echo#formatted([
          \ 'vimtex: ', ['VimtexWarning', 'reloaded']])

    unlet s:reloading_script
  endfunction
endif

" }}}1
function! vimtex#toggle_main() " {{{1
  if exists('b:vimtex_local')
    let b:vimtex_local.active = !b:vimtex_local.active

    let b:vimtex_id = b:vimtex_local.active
          \ ? b:vimtex_local.sub_id
          \ : b:vimtex_local.main_id
    let b:vimtex = g:vimtex_data[b:vimtex_id]

    call vimtex#echo#status(['vimtex: ',
          \ ['Normal', 'Changed to `'],
          \ ['VimtexSuccess', b:vimtex.base],
          \ ['Normal', "' "],
          \ ['VimtexInfo', b:vimtex_local.active ? '[local]' : '[main]' ]])
  endif
endfunction

" }}}1


function! s:check_version() " {{{1
  if s:initialized || get(g:, 'vimtex_disable_version_warning', 0)
    return
  endif

  if v:version <= 703 && !has('patch544')
    echoerr 'vimtex error: Please use Vim version 7.3.544 or newer!'
  endif
endfunction

" }}}1

function! s:init_buffer() " {{{1
  "
  " First we set some vim options
  "
  let s:save_cpo = &cpo
  set cpo&vim

  " Ensure tex files are prioritized when listing files
  for suf in [
        \ '.log',
        \ '.aux',
        \ '.bbl',
        \ '.out',
        \ '.blg',
        \ '.brf',
        \ '.cb',
        \ '.dvi',
        \ '.fdb_latexmk',
        \ '.fls',
        \ '.idx',
        \ '.ilg',
        \ '.ind',
        \ '.inx',
        \ '.pdf',
        \ '.synctex.gz',
        \ '.toc',
        \ ]
    execute 'set suffixes+=' . suf
  endfor

  setlocal suffixesadd=.tex
  setlocal comments=sO:%\ -,mO:%\ \ ,eO:%%,:%
  setlocal commentstring=%%s

  let &l:define  = '\\\([egx]\|char\|mathchar\|count\|dimen\|muskip\|skip'
  let &l:define .= '\|toks\)\=def\|\\font\|\\\(future\)\=let'
  let &l:define .= '\|\\new\(count\|dimen\|skip'
  let &l:define .= '\|muskip\|box\|toks\|read\|write\|fam\|insert\)'
  let &l:define .= '\|\\\(re\)\=new\(boolean\|command\|counter\|environment'
  let &l:define .= '\|font\|if\|length\|savebox'
  let &l:define .= '\|theorem\(style\)\=\)\s*\*\=\s*{\='
  let &l:define .= '\|DeclareMathOperator\s*{\=\s*'

  let &l:include = '\v\\%(input|include)\{'
  let &l:includeexpr  = 'substitute('
  let &l:includeexpr .=   "substitute(v:fname, '\\\\space', '', 'g'),"
  let &l:includeexpr .=   "'^.\\{-}{\"\\?\\|\"\\?}.*', '', 'g')"

  let &cpo = s:save_cpo
  unlet s:save_cpo

  "
  " Next we initialize the data blob
  "

  " Create container for data blobs if it does not exist
  let g:vimtex_data = get(g:, 'vimtex_data', {})

  " Get main file number and check if data blob already exists
  let main = s:get_main()
  let id   = s:get_id(main)
  if id >= 0
    " Link to existing blob
    let b:vimtex_id = id
    let b:vimtex = g:vimtex_data[id]
  else
    " Create new blob
    let b:vimtex = {}
    let b:vimtex.tex  = main
    let b:vimtex.root = fnamemodify(b:vimtex.tex, ':h')
    let b:vimtex.base = fnamemodify(b:vimtex.tex, ':t')
    let b:vimtex.name = fnamemodify(b:vimtex.tex, ':t:r')
    function b:vimtex.aux() dict
      return s:get_main_ext(self, 'aux')
    endfunction
    function b:vimtex.log() dict
      return s:get_main_ext(self, 'log')
    endfunction
    function b:vimtex.out() dict
      return s:get_main_ext(self, 'pdf')
    endfunction

    let s:vimtex_next_id = get(s:, 'vimtex_next_id', -1) + 1
    let b:vimtex_id = s:vimtex_next_id
    let g:vimtex_data[b:vimtex_id] = b:vimtex
  endif

  "
  " Define commands and mappings
  "

  " Define commands
  command! -buffer -bang VimtexInfo       call vimtex#info(<q-bang> == "!")
  command! -buffer -bang VimtexWordCount  call vimtex#wc(<q-bang> == "!")
  command! -buffer       VimtexReload     call vimtex#reload()
  command! -buffer       VimtexToggleMain call vimtex#toggle_main()

  " Define mappings
  nnoremap <buffer> <plug>(vimtex-info)        :VimtexInfo<cr>
  nnoremap <buffer> <plug>(vimtex-info-full)   :VimtexInfo!<cr>
  nnoremap <buffer> <plug>(vimtex-reload)      :VimtexReload<cr>
  nnoremap <buffer> <plug>(vimtex-toggle-main) :VimtexToggleMain<cr>

  "
  " Attach autocommands
  "

  augroup vimtex_buffers
    au BufFilePre  <buffer> call s:filename_changed_pre()
    au BufFilePost <buffer> call s:filename_changed_post()
    au BufLeave    <buffer> call s:buffer_left()
    au BufDelete   <buffer> call s:buffer_deleted()
    au QuitPre     <buffer> silent! doautocmd User VimtexEventQuit
  augroup END
endfunction

" }}}1
function! s:init_mappings() " {{{1
  if !get(g:,'vimtex_mappings_enabled', 1) | return | endif

  function! s:map(mode, lhs, rhs, ...)
    if !hasmapto(a:rhs, a:mode)
          \ && (a:0 > 0 || maparg(a:lhs, a:mode) ==# '')
      silent execute a:mode . 'map <silent><buffer>' a:lhs a:rhs
    endif
  endfunction

  call s:map('n', '<localleader>li', '<plug>(vimtex-info)')
  call s:map('n', '<localleader>lI', '<plug>(vimtex-info-full)')
  call s:map('n', '<localleader>lx', '<plug>(vimtex-reload)')
  call s:map('n', '<localleader>ls', '<plug>(vimtex-toggle-main)')

  call s:map('n', 'ds$', '<plug>(vimtex-env-delete-math)')
  call s:map('n', 'cs$', '<plug>(vimtex-env-change-math)')
  call s:map('n', 'dse', '<plug>(vimtex-env-delete)')
  call s:map('n', 'cse', '<plug>(vimtex-env-change)')
  call s:map('n', 'tse', '<plug>(vimtex-env-toggle-star)')

  call s:map('n', 'dsc',  '<plug>(vimtex-cmd-delete)')
  call s:map('n', 'csc',  '<plug>(vimtex-cmd-change)')
  call s:map('n', '<F7>', '<plug>(vimtex-cmd-create)')
  call s:map('i', '<F7>', '<plug>(vimtex-cmd-create)')

  call s:map('n', 'tsd', '<plug>(vimtex-delim-toggle-modifier)')
  call s:map('v', 'tsd', '<plug>(vimtex-delim-toggle-modifier)')
  call s:map('i', ']]',  '<plug>(vimtex-delim-close)')

  if g:vimtex_latexmk_enabled
    call s:map('n', '<localleader>ll', '<plug>(vimtex-compile-toggle)')
    call s:map('n', '<localleader>lo', '<plug>(vimtex-compile-output)')
    call s:map('n', '<localleader>lk', '<plug>(vimtex-stop)')
    call s:map('n', '<localleader>lK', '<plug>(vimtex-stop-all)')
    call s:map('n', '<localleader>le', '<plug>(vimtex-errors)')
    call s:map('n', '<localleader>lc', '<plug>(vimtex-clean)')
    call s:map('n', '<localleader>lC', '<plug>(vimtex-clean-full)')
    call s:map('n', '<localleader>lg', '<plug>(vimtex-status)')
    call s:map('n', '<localleader>lG', '<plug>(vimtex-status-all)')
  endif

  if g:vimtex_motion_enabled
    call s:map('n', '}', '<plug>(vimtex-})')
    call s:map('n', '{', '<plug>(vimtex-{)')
    call s:map('x', '}', '<plug>(vimtex-})')
    call s:map('x', '{', '<plug>(vimtex-{)')
    call s:map('o', '}', '<plug>(vimtex-})')
    call s:map('o', '{', '<plug>(vimtex-{)')
    call s:map('n', ']]', '<plug>(vimtex-]])')
    call s:map('n', '][', '<plug>(vimtex-][)')
    call s:map('n', '[]', '<plug>(vimtex-[])')
    call s:map('n', '[[', '<plug>(vimtex-[[)')
    call s:map('x', ']]', '<plug>(vimtex-]])')
    call s:map('x', '][', '<plug>(vimtex-][)')
    call s:map('x', '[]', '<plug>(vimtex-[])')
    call s:map('x', '[[', '<plug>(vimtex-[[)')
    call s:map('o', ']]', '<plug>(vimtex-]])')
    call s:map('o', '][', '<plug>(vimtex-][)')
    call s:map('o', '[]', '<plug>(vimtex-[])')
    call s:map('o', '[[', '<plug>(vimtex-[[)')

    " These are forced in order to overwrite matchit mappings
    call s:map('n', '%', '<plug>(vimtex-%)', 1)
    call s:map('x', '%', '<plug>(vimtex-%)', 1)
    call s:map('o', '%', '<plug>(vimtex-%)', 1)
  endif

  if g:vimtex_text_obj_enabled
    call s:map('x', 'ic', '<plug>(vimtex-ic)')
    call s:map('x', 'ac', '<plug>(vimtex-ac)')
    call s:map('o', 'ic', '<plug>(vimtex-ic)')
    call s:map('o', 'ac', '<plug>(vimtex-ac)')
    call s:map('x', 'id', '<plug>(vimtex-id)')
    call s:map('x', 'ad', '<plug>(vimtex-ad)')
    call s:map('o', 'id', '<plug>(vimtex-id)')
    call s:map('o', 'ad', '<plug>(vimtex-ad)')
    call s:map('x', 'ie', '<plug>(vimtex-ie)')
    call s:map('x', 'ae', '<plug>(vimtex-ae)')
    call s:map('o', 'ie', '<plug>(vimtex-ie)')
    call s:map('o', 'ae', '<plug>(vimtex-ae)')
    call s:map('x', 'i$', '<plug>(vimtex-i$)')
    call s:map('x', 'a$', '<plug>(vimtex-a$)')
    call s:map('o', 'i$', '<plug>(vimtex-i$)')
    call s:map('o', 'a$', '<plug>(vimtex-a$)')
    call s:map('x', 'ip', '<plug>(vimtex-ip)')
    call s:map('x', 'ap', '<plug>(vimtex-ap)')
    call s:map('o', 'ip', '<plug>(vimtex-ip)')
    call s:map('o', 'ap', '<plug>(vimtex-ap)')
  endif

  if g:vimtex_toc_enabled
    call s:map('n', '<localleader>lt', '<plug>(vimtex-toc-open)')
    call s:map('n', '<localleader>lT', '<plug>(vimtex-toc-toggle)')
  endif

  if g:vimtex_labels_enabled
    call s:map('n', '<localleader>ly', '<plug>(vimtex-labels-open)')
    call s:map('n', '<localleader>lY', '<plug>(vimtex-labels-toggle)')
  endif

  if g:vimtex_view_enabled
    call s:map('n', '<localleader>lv', '<plug>(vimtex-view)')
    if has_key(b:vimtex.viewer, 'reverse_search')
      call s:map('n', '<localleader>lr', '<plug>(vimtex-reverse-search)')
    endif
  endif

  if g:vimtex_imaps_enabled
    call s:map('n', '<localleader>lm', '<plug>(vimtex-imaps-list)')
  endif
endfunction

" }}}1
function! s:init_modules(initmode) " {{{1
  for module in s:modules
    execute 'call vimtex#' . module . '#init_' . a:initmode . '()'
  endfor
endfunction

" }}}1
function! s:init_local_blob() " {{{1
  let l:filename = expand('%:p')

  if b:vimtex.tex !=# l:filename
    let l:local = deepcopy(b:vimtex)
    let l:local.tex = l:filename
    let l:local.pid = 0
    let l:local.name = fnamemodify(l:filename, ':t:r')
    let l:local.root = fnamemodify(l:filename, ':h')
    let l:local.base = fnamemodify(l:filename, ':t')

    let s:vimtex_next_id += 1
    let g:vimtex_data[s:vimtex_next_id] = l:local

    let b:vimtex_local = {
          \ 'active' : 0,
          \ 'main_id' : b:vimtex_id,
          \ 'sub_id' : s:vimtex_next_id,
          \}
  endif
endfunction

" }}}1

function! s:get_id(main) " {{{1
  for [id, data] in items(g:vimtex_data)
    if data.tex == a:main
      return id
    endif
  endfor

  return -1
endfunction

function! s:get_main() " {{{1
  "
  " Use buffer variable if it exists
  "
  if exists('b:vimtex_main') && filereadable(b:vimtex_main)
    return fnamemodify(b:vimtex_main, ':p')
  endif

  "
  " Search for TEX root specifier at the beginning of file. This is used by
  " several other plugins and editors.
  "
  let l:candidate = s:get_main_from_specifier(
        \ '^\c\s*%\s*!\?\s*tex\s\+root\s*=\s*\zs.*\ze\s*$')
  if l:candidate !=# ''
    return l:candidate
  endif

  "
  " Support for subfiles package
  "
  let l:candidate = s:get_main_from_specifier(
        \ '^\C\s*\\documentclass\[\zs.*\ze\]{subfiles}')
  if l:candidate !=# ''
    return l:candidate
  endif

  "
  " Search for .latexmain-specifier
  "
  let l:candidate = s:get_main_latexmain(expand('%:p'))
  if l:candidate !=# ''
    return l:candidate
  endif

  "
  " Search for main file recursively through include specifiers
  "
  let l:candidate = s:get_main_recurse(expand('%:p'))
  if l:candidate !=# ''
    return l:candidate
  endif

  "
  " If not found, use current file
  "
  return expand('%:p')
endfunction

" }}}1
function! s:get_main_from_specifier(spec) " {{{1
  for l:line in getline(1, 5)
    let l:filename = matchstr(l:line, a:spec)
    if len(l:filename) > 0
      if l:filename[0] ==# '/'
        if filereadable(l:filename) | return l:filename | endif
      else
        for l:candidate in [
              \ expand('%:p:h') . '/' . l:filename,
              \ getcwd()        . '/' . l:filename
              \]
          if filereadable(l:candidate) | return l:candidate | endif
        endfor
      endif
    endif
  endfor

  return ''
endfunction

" }}}1
function! s:get_main_latexmain(file) " {{{1
  "
  " Gather candidate files
  "
  let l:path = expand('%:p:h')
  let l:dirs = l:path
  while l:path != fnamemodify(l:path, ':h')
    let l:path = fnamemodify(l:path, ':h')
    let l:dirs .= ',' . l:path
  endwhile
  let l:candidates = split(globpath(fnameescape(l:dirs), '*.latexmain'), '\n')

  "
  " If any candidates found, use the first one (corresponding to the one
  " closest to the current file in the directory tree)
  "
  if len(l:candidates) > 0
    let l:candidate = fnamemodify(l:candidates[0], ':p:r')
    return filereadable(l:candidate) ? l:candidate : ''
  endif
endfunction

function! s:get_main_recurse(file) " {{{1
  if !filereadable(a:file) | return '' | endif

  "
  " Check if current file is a main file
  "
  if len(filter(readfile(a:file),
        \ 'v:val =~# ''\C\\documentclass\_\s*[\[{]''')) > 0
    return fnamemodify(a:file, ':p')
  endif

  "
  " Gather candidate files
  "
  let l:path = expand('%:p:h')
  let l:dirs = l:path
  while l:path != fnamemodify(l:path, ':h')
    let l:path = fnamemodify(l:path, ':h')
    let l:dirs .= ',' . l:path
  endwhile
  let l:candidates = split(globpath(fnameescape(l:dirs), '*.tex'), '\n')

  "
  " Search through candidates
  "
  for l:file in l:candidates
    " Avoid infinite recursion (checking the same file repeatedly)
    if l:file == a:file | continue | endif

    let l:file_re = '\s*((.*)\/)?' . fnamemodify(a:file, ':t:r')

    let l:filter  = 'v:val =~# ''\v'
    let l:filter .= '\\%(input|include)\{' . l:file_re
    let l:filter .= '|\\subimport\{[^\}]*\}\{' . l:file_re
    let l:filter .= ''''

    if len(filter(readfile(l:file), l:filter)) > 0
      return s:get_main_recurse(l:file)
    endif
  endfor
endfunction

function! s:get_main_ext(self, ext) " {{{1
  " First check build dir (latexmk -output_directory option)
  if g:vimtex_latexmk_build_dir !=# ''
    let cand = g:vimtex_latexmk_build_dir . '/' . a:self.name . '.' . a:ext
    if g:vimtex_latexmk_build_dir[0] !=# '/'
      let cand = a:self.root . '/' . cand
    endif
    if filereadable(cand)
      return fnamemodify(cand, ':p')
    endif
  endif

  " Next check for file in project root folder
  let cand = a:self.root . '/' . a:self.name . '.' . a:ext
  if filereadable(cand)
    return fnamemodify(cand, ':p')
  endif

  " Finally return empty string if no entry is found
  return ''
endfunction

" }}}1

function! s:filename_changed_pre() " {{{1
  let thisfile = fnamemodify(expand('%'), ':p')
  let s:filename_changed = thisfile ==# b:vimtex.tex
  let s:filename_old = b:vimtex.base
endfunction

" }}}1
function! s:filename_changed_post() " {{{1
  if s:filename_changed
    let b:vimtex.tex = fnamemodify(expand('%'), ':p')
    let b:vimtex.base = fnamemodify(b:vimtex.tex, ':t')
    let b:vimtex.name = fnamemodify(b:vimtex.tex, ':t:r')
    let message = ['vimtex: ',
          \ ['VimtexWarning', 'Filename change detected!'],
          \ "\n  Old filename: ", ['VimtexInfo', s:filename_old],
          \ "\n  New filename: ", ['VimtexInfo', b:vimtex.base]]

    if b:vimtex.pid
      let message += ["\n  latexmk process: ",
            \ ['VimtexInfo', b:vimtex.pid],
            \ ['VimtexWarning', ' killed!']]
      call vimtex#latexmk#stop()
    endif

    call vimtex#echo#status(message)
  endif
endfunction

" }}}1

function! s:print_dict(dict, ...) " {{{1
  let level = a:0 > 0 ? a:1 : 0

  for entry in sort(sort(items(a:dict),
        \ 's:print_dict_sort_2'),
        \ 's:print_dict_sort_1')
    let title = repeat(' ', 2 + 2*level) . entry[0]
    if type(entry[1]) == type([])
      call vimtex#echo#echo(title)
      for val in entry[1]
        call vimtex#echo#echo(repeat(' ', 4 + 2*level) . string(val), 'None')
      endfor
    elseif type(entry[1]) == type({})
      call vimtex#echo#echo(title . "\n")
      call s:print_dict(entry[1], level + 1)
    else
      call vimtex#echo#formatted([title . ' : ',
            \ ['None', string(entry[1]) . "\n"]])
    endif
  endfor
endfunction

" }}}1
function! s:print_dict_sort_1(i1, i2) " {{{1
  return type(a:i1[1]) - type(a:i2[1])
endfunction

" }}}1
function! s:print_dict_sort_2(i1, i2) " {{{1
  return string(a:i1[1]) == string(a:i2[1]) ? 0
        \ : string(a:i1[1]) > string(a:i2[1]) ? 1
        \ : -1
endfunction

" }}}1

function! s:buffer_left() " {{{1
  let s:vimtex_id = b:vimtex_id
endfunction

" }}}1
function! s:buffer_deleted() " {{{1
  "
  " Check if the deleted buffer was the last remaining buffer of an opened
  " latex project
  "
  if !exists('s:vimtex_id') | return | endif
  if !has_key(g:vimtex_data, s:vimtex_id) | return | endif

  let l:listed_buffers = filter(range(1, bufnr('$')), 'buflisted(v:val)')
  let l:vimtex_ids = map(l:listed_buffers, 'getbufvar(v:val, ''vimtex_id'', -1)')
  if count(l:vimtex_ids, s:vimtex_id) - 1 <= 0
    let l:vimtex = remove(g:vimtex_data, s:vimtex_id)

    if exists('#User#VimtexEventQuit')
      if exists('b:vimtex')
        let b:vimtex_tmp = b:vimtex
      endif
      let b:vimtex = l:vimtex
      doautocmd User VimtexEventQuit
      if exists('b:vimtex_tmp')
        unlet b:vimtex_tmp
      else
        unlet b:vimtex
      endif
    endif
  endif
endfunction

" }}}1

" vim: fdm=marker sw=2
