set nocompatible			" be iMproved, required
filetype off				" required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
" call vundle#begin('~/some/path/here')

Plugin 'VundleVim/Vundle.vim'

Plugin 'chriskempson/vim-tomorrow-theme'

Plugin 'tpope/vim-fugitive'

Plugin 'scrooloose/nerdtree'
"Toggle nerd tree with CTRL + n
map <C-n> :NERDTreeToggle<CR>

Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

Plugin 'jalcine/cmake.vim'

Plugin 'scrooloose/syntastic'
"C++
let g:syntastic_cpp_compiler = '/usr/bin/g++'
let g:syntastic_cpp_check_header = 1
let g:syntastic_cpp_auto_refresh_includes = 1
"C
let g:syntastic_c_compiler = '/usr/bin/gcc'
let g:syntastic_c_check_header = 1
"Java
let g:syntastic_java_javac_executable = '/usr/bin/javac'
"HTML
let g:syntastic_html_checkers = ['w3']
let g:syntastic_html_w3_exec = '/usr/bin/curl'

Plugin 'xolox/vim-session'
let g:session_autosave = 'yes'

Plugin 'xolox/vim-misc'
let g:session_autoload = 'no'

Plugin 'scrooloose/nerdcommenter'
filetype plugin on

Plugin 'lervag/vimtex'

Plugin 'jiangmiao/auto-pairs'
let g:AutoPairs = {'{':'}'}
" let g:AutoPairs = {'(':')', '[':']', '{':'}', '"':'"'}

Plugin 'majutsushi/tagbar'

Plugin 'Yggdroot/indentLine'
let g:indentLine_char = '|'
let g:indentLine_color_term = 239 " Vim
let g:indentLine_color_gui = '#A4E57E' " GVim
" none X terminal
let g:indentLine_color_tty_light = 7 " (default: 4)
let g:indentLine_color_dark = 1 " (default: 2)

Plugin 'christoomey/vim-tmux-navigator'

call vundle#end()			" required
filetype plugin indent on	" required

colorscheme Tomorrow-Night-Eighties

if v:progname =~? "evim"
	finish
endif

" Fixing really weird issue with and home, end and F keys
map [7~ <HOME>
map [8~ <END>
map [11~ <F1>
map [12~ <F2>
map [13~ <F3>

" Using insert mode, you can insert a single character by simply typing
" <space> + char
nnoremap <Space> i_<Esc>r

set pastetoggle=<F2>

" Map Ctrl+y/C to copy text to clipboard/pimary buffers
" Map Ctrl+p/P to paste text from clipboard/pimary buffers
:noremap <C-y> "+y
:noremap <C-p> "+p

" Prevent d, x and dd from putting text into a register
:nnoremap x "_x
:noremap d "_d
:noremap dd "_dd

set tabstop=4
set shiftwidth=4
autocmd BufNewFile,BufRead *.py set expandtab "python convention

" Display vertical lines for TABBED indent levels
set list    " Display unprintable characters f12 - switches
set listchars=tab:•\ ,trail:•,extends:»,precedes:«   " Unprintable chars mapping

" Remove trailing whitespace
autocmd BufWritePre * %s/\s\+$//e

"set encoding=utf-8
"set fileencoding=utf-8

let g:NERDTreeDirArrows=0

" Redirect backup files from main dir to avoid clutter
set backupdir=~/.vim/backups,~/tmp

" Paste properly more than once over a line
xnoremap p pgvy

"Syntax highlighting
syntax on

" autosave when focus is lost from window
au FocusLost * :wa

" Turns on english dictionary spellcheck
" autocmd BufNewFile,BufRead *.txt setlocal spell spelllang=en_us

" Turn on C style indenting and smart indenting
set autoindent
set smartindent
set cindent

" Defines folds automatically based on the languages syntax, if defined
au BufNewFile,BufRead *.c,*.h,*.cc,*.cpp,*.hpp,*.java setlocal foldmethod=syntax foldnestmax=2
au BufNewFile,BufRead *.py,*.js setlocal foldmethod=indent foldnestmax=2
au BufNewFile,BufRead *.vcd,*.html setlocal foldmethod=indent foldnestmax=3
"let c_no_comment_fold = 2

" Maps F9 for toggling folds
inoremap <F9> <C-O>za
nnoremap <F9> za
onoremap <F9> <C-C>za
vnoremap <F9> zf

" Hotkey for toggling the tagbar plugin
nmap <F8> :TagbarToggle<CR>

" Ignore searching type case
:set ignorecase

" Adds BASED line numbers
set nu

set timeoutlen=1000 ttimeoutlen=0

" Remap esc to jj and jf
imap jj <Esc>
imap jJ <Esc>
imap Jj <Esc>
imap JJ <Esc>

" cc without leaving normal mode and removing line
nnoremap cd Vx

" Added capital maps for save & quit & undo
:command WQ wq
:command Wq wq
:command W w
:command Q q

" Set cursor line
set cursorline
hi CursorLine cterm=none ctermbg=darkgrey term=none
hi Todo term=standout ctermbg=11 ctermfg=9

set autoread

set term=screen-256color

" Ctrl + c redraws the screen and removes any search highlighting.
noremap <silent><C-c> :noh<CR>

" allow backspacing over everything in insert mode
set backspace=indent,eol,start

if has("vms")
	set nobackup        " do not keep a backup file, use versions instead
else
	set backup          " keep a backup file (restore to previous version)
	set undofile        " keep an undo file (undo changes after closing)
endif
set history=50  " keep 50 lines of command line history
set ruler       " show the cursor position all the time
set showcmd     " display incomplete commands
set incsearch   " do incremental searching

" For Win32 GUI: remove 't' flag from 'guioptions': no tearoff menu entries
" let &guioptions = substitute(&guioptions, "t", "", "g")

" Don't use Ex mode, use Q for formatting
map Q gq

" Map CTRL-a and CTRL-e to the first and last char of a line
"map <C-a> ^
"map <C-e> g_

" Map home and end to the first and last char of a line
map <HOME> ^
map <END> g_

" Simple visual mode map of a and e to go to beg and end
vnoremap a ^
vnoremap e g_

" CTRL-U in insert mode deletes a lot. Use CTRL-G u to first break undo,
" so that you can undo CTRL-U after inserting a line break.
inoremap <C-U> <C-G>u<C-U>

" In many terminal emulators the mouse works just fine, thus enable it.
set mouse+=a
if &term =~ '^screen'
	" tmux knows the extended mouse mode
	set ttymouse=xterm2
endif

" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
if &t_Co > 2 || has("gui_running")
	syntax on
	set hlsearch
endif

" Only do this part when compiled with support for autocommands.
if has("autocmd")

" Enable file type detection.
" Use the default filetype settings, so that mail gets 'tw' set to 72,
" 'c'indent' is on in C files, etc.
" Also load indent files, to automatically do language-dependent indenting.
	filetype plugin indent on

" Put these in an autocmd group, so that we can delete them easily.
	augroup vimrcEx
	au!

" For all text files set 'textwidth' to 80 characters.
	autocmd FileType text setlocal textwidth=80

" When editing a file, always jump to the last known cursor position.
" Don't do it when the position is invalid or when inside an event handler
" (happens when dropping a file on gvim).
" Also don't do it when the mark is in the first line, that is the default
" position when opening a file.
	autocmd BufReadPost *
		\ if line("'\"") > 1 && line("'\"") <= line("$") |
		\	exe "normal! g`\"" |
		\ endif

augroup END

else

endif " has("autocmd")

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.
if !exists(":DiffOrig")
	command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis
		\ | wincmd p | diffthis
endif
