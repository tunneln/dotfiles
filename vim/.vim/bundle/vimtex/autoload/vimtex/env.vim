" vimtex - LaTeX plugin for Vim
"
" Maintainer: Karl Yngve Lervåg
" Email:      karl.yngve@gmail.com
"

function! vimtex#env#init_options() " {{{1
  call vimtex#util#set_default('g:vimtex_env_complete_list', [
        \ 'itemize',
        \ 'enumerate',
        \ 'description',
        \ 'center',
        \ 'figure',
        \ 'table',
        \ 'equation',
        \ 'multline',
        \ 'align',
        \ 'split',
        \ '\[',
        \ ])
endfunction

" }}}1
function! vimtex#env#init_script() " {{{1
endfunction

" }}}1
function! vimtex#env#init_buffer() " {{{1
  nnoremap <silent><buffer> <plug>(vimtex-env-delete)
        \ :call vimtex#env#delete('env')<cr>

  nnoremap <silent><buffer> <plug>(vimtex-env-change)
        \ :call vimtex#env#change_prompt('env')<cr>

  nnoremap <silent><buffer> <plug>(vimtex-env-delete-math)
        \ :call vimtex#env#delete('env_math')<cr>

  nnoremap <silent><buffer> <plug>(vimtex-env-change-math)
        \ :call vimtex#env#change_prompt('env_math')<cr>

  nnoremap <silent><buffer> <plug>(vimtex-env-toggle-star)
        \ :call vimtex#env#toggle_star()<cr>
endfunction

" }}}1

function! vimtex#env#change(open, close, new) " {{{1
  "
  " Set target environment
  "
  if a:new ==# ''
    let [l:beg, l:end] = ['', '']
  elseif a:new ==# '$'
    let [l:beg, l:end] = ['$', '$']
  elseif a:new ==# '$$'
    let [l:beg, l:end] = ['$$', '$$']
  elseif a:new ==# '\['
    let [l:beg, l:end] = ['\[', '\]']
  elseif a:new ==# '\('
    let [l:beg, l:end] = ['\(', '\)']
  else
    let l:beg = '\begin{' . a:new . '}'
    let l:end = '\end{' . a:new . '}'
  endif

  let l:line = getline(a:open.lnum)
  call setline(a:open.lnum,
        \   strpart(l:line, 0, a:open.cnum-1)
        \ . l:beg
        \ . strpart(l:line, a:open.cnum + len(a:open.match) - 1))

  let l:c1 = a:close.cnum
  let l:c2 = a:close.cnum + len(a:close.match) - 1
  if a:open.lnum == a:close.lnum
    let n = len(l:beg) - len(a:open.match)
    let l:c1 += n
    let l:c2 += n
    let pos = getpos('.')
    if pos[2] > a:open.cnum + len(a:open.match) - 1
      let pos[2] += n
      call setpos('.', pos)
    endif
  endif

  let l:line = getline(a:close.lnum)
  call setline(a:close.lnum,
        \ strpart(l:line, 0, l:c1-1) . l:end . strpart(l:line, l:c2))

  if a:new ==# ''
    silent! call repeat#set("\<plug>(vimtex-env-delete)", v:count)
  else
    silent! call repeat#set(
          \ "\<plug>(vimtex-env-change)" . a:new . '', v:count)
  endif
endfunction

function! vimtex#env#change_prompt(type) " {{{1
  let [l:open, l:close] = vimtex#delim#get_surrounding(a:type)
  if empty(l:open) | return | endif

  let l:name = get(l:open, 'name', l:open.is_open
        \ ? l:open.match . ' ... ' . l:open.corr
        \ : l:open.match . ' ... ' . l:open.corr)
  call vimtex#echo#status(['Change surrounding environment: ',
        \ ['VimtexWarning', l:name]])
  echohl VimtexMsg
  let l:new_env = input('> ', '', 'customlist,' . s:sidwrap('input_complete'))
  echohl None
  if empty(l:new_env) | return | endif

  call vimtex#env#change(l:open, l:close, l:new_env)
endfunction

function! vimtex#env#delete(type) " {{{1
  let [l:open, l:close] = vimtex#delim#get_surrounding(a:type)
  if empty(l:open) | return | endif

  call vimtex#env#change(l:open, l:close, '')
endfunction

function! vimtex#env#toggle_star() " {{{1
  let [l:open, l:close] = vimtex#delim#get_surrounding('env')
  if empty(l:open) | return | endif

  call vimtex#env#change(l:open, l:close,
        \ l:open.starred ? l:open.name : l:open.name . '*')

  silent! call repeat#set("\<plug>(vimtex-env-toggle-star)", v:count)
endfunction

" }}}1

function! vimtex#env#is_inside(env) " {{{1
  let l:pos = getpos('.')
  let l:pos_val = 10000*l:pos[1] + l:pos[2]
  let l:tries = 10

  while l:tries > 0
    let l:tries -= 1
    let [l:open, l:close] = vimtex#delim#get_surrounding('env')
    if empty(l:open) | break | endif

    if !empty(l:close) && (l:pos_val >= 10000*l:close.lnum + l:close.cnum)
      continue
    endif

    if l:open.name ==# a:env
      call setpos('.', l:pos)
      return 1
    endif

    call setpos('.', s:pos_prev(l:open))
  endwhile

  call setpos('.', l:pos)
  return 0
endfunction

" }}}1

function! s:pos_prev(env) " {{{1
    return a:env.cnum > 1
          \ ? [0, a:env.lnum, a:env.cnum-1, 0]
          \ : [0, max([a:env.lnum-1, 1]), strlen(getline(a:env.lnum-1)), 0]
endfunction

" }}}1

function! s:sidwrap(func) " {{{1
  return matchstr(expand('<sfile>'), '\zs<SNR>\d\+_\ze.*$') . a:func
endfunction

" }}}1
function! s:input_complete(lead, cmdline, pos) " {{{1
  return filter(g:vimtex_env_complete_list, 'v:val =~# ''^' . a:lead . '''')
endfunction

" }}}1

" vim: fdm=marker sw=2
