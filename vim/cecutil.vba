" Vimball Archiver by Charles E. Campbell, Jr., Ph.D.
UseVimball
finish
plugin/cecutil.vim	[[[1
536
" cecutil.vim : save/restore window position
"               save/restore mark position
"               save/restore selected user maps
"  Author:	Charles E. Campbell
"  Version:	18i	ASTRO-ONLY
"  Date:	Oct 21, 2013
"
"  Saving Restoring Destroying Marks: {{{1
"       call SaveMark(markname)       let savemark= SaveMark(markname)
"       call RestoreMark(markname)    call RestoreMark(savemark)
"       call DestroyMark(markname)
"       commands: SM RM DM
"
"  Saving Restoring Destroying Window Position: {{{1
"       call SaveWinPosn()        let winposn= SaveWinPosn()
"       call RestoreWinPosn()     call RestoreWinPosn(winposn)
"		\swp : save current window/buffer's position
"		\rwp : restore current window/buffer's previous position
"       commands: SWP RWP
"
"  Saving And Restoring User Maps: {{{1
"       call SaveUserMaps(mapmode,maplead,mapchx,suffix)
"       call RestoreUserMaps(suffix)
"
" GetLatestVimScripts: 1066 1 :AutoInstall: cecutil.vim
"
" You believe that God is one. You do well. The demons also {{{1
" believe, and shudder. But do you want to know, vain man, that
" faith apart from works is dead?  (James 2:19,20 WEB)
"redraw!|call inputsave()|call input("Press <cr> to continue")|call inputrestore()

" ---------------------------------------------------------------------
" Load Once: {{{1
if &cp || exists("g:loaded_cecutil")
 finish
endif
let g:loaded_cecutil = "v18i"
let s:keepcpo        = &cpo
set cpo&vim
"DechoRemOn

" =======================
"  Public Interface: {{{1
" =======================

" ---------------------------------------------------------------------
"  Map Interface: {{{2
if !hasmapto('<Plug>SaveWinPosn')
 map <unique> <Leader>swp <Plug>SaveWinPosn
endif
if !hasmapto('<Plug>RestoreWinPosn')
 map <unique> <Leader>rwp <Plug>RestoreWinPosn
endif
nmap <silent> <Plug>SaveWinPosn		:call SaveWinPosn()<CR>
nmap <silent> <Plug>RestoreWinPosn	:call RestoreWinPosn()<CR>

" ---------------------------------------------------------------------
" Command Interface: {{{2
com! -bar -nargs=0 SWP	call SaveWinPosn()
com! -bar -nargs=? RWP	call RestoreWinPosn(<args>)
com! -bar -nargs=1 SM	call SaveMark(<q-args>)
com! -bar -nargs=1 RM	call RestoreMark(<q-args>)
com! -bar -nargs=1 DM	call DestroyMark(<q-args>)

com! -bar -nargs=1 WLR	call s:WinLineRestore(<q-args>)

if v:version < 630
 let s:modifier= "sil! "
else
 let s:modifier= "sil! keepj "
endif

" ===============
" Functions: {{{1
" ===============

" ---------------------------------------------------------------------
" SaveWinPosn: {{{2
"    let winposn= SaveWinPosn()  will save window position in winposn variable
"    call SaveWinPosn()          will save window position in b:cecutil_winposn{b:cecutil_iwinposn}
"    let winposn= SaveWinPosn(0) will *only* save window position in winposn variable (no stacking done)
fun! SaveWinPosn(...)
"  echomsg "Decho: SaveWinPosn() a:0=".a:0
  if line("$") == 1 && getline(1) == ""
"   echomsg "Decho: SaveWinPosn : empty buffer"
   return ""
  endif
  let so_keep   = &l:so
  let siso_keep = &siso
  let ss_keep   = &l:ss
  setlocal so=0 siso=0 ss=0

  let swline = line(".")                           " save-window line in file
  let swcol  = col(".")                            " save-window column in file
  if swcol >= col("$")
   let swcol= swcol + virtcol(".") - virtcol("$")  " adjust for virtual edit (cursor past end-of-line)
  endif
  let swwline   = winline() - 1                    " save-window window line
  let swwcol    = virtcol(".") - wincol()          " save-window window column
  let savedposn = ""
"  echomsg "Decho: sw[".swline.",".swcol."] sww[".swwline.",".swwcol."]"
  let savedposn = "call GoWinbufnr(".winbufnr(0).")"
  let savedposn = savedposn."|".s:modifier.swline
  let savedposn = savedposn."|".s:modifier."norm! 0z\<cr>"
  if swwline > 0
   let savedposn= savedposn.":".s:modifier."call s:WinLineRestore(".(swwline+1).")\<cr>"
  endif
  if swwcol > 0
   let savedposn= savedposn.":".s:modifier."norm! 0".swwcol."zl\<cr>"
  endif
  let savedposn = savedposn.":".s:modifier."call cursor(".swline.",".swcol.")\<cr>"

  " save window position in
  " b:cecutil_winposn_{iwinposn} (stack)
  " only when SaveWinPosn() is used
  if a:0 == 0
   if !exists("b:cecutil_iwinposn")
	let b:cecutil_iwinposn= 1
   else
	let b:cecutil_iwinposn= b:cecutil_iwinposn + 1
   endif
"   echomsg "Decho: saving posn to SWP stack"
   let b:cecutil_winposn{b:cecutil_iwinposn}= savedposn
  endif

  let &l:so = so_keep
  let &siso = siso_keep
  let &l:ss = ss_keep

"  if exists("b:cecutil_iwinposn")                                                                  " Decho
"   echomsg "Decho: b:cecutil_winpos{".b:cecutil_iwinposn."}[".b:cecutil_winposn{b:cecutil_iwinposn}."]"
"  else                                                                                             " Decho
"   echomsg "Decho: b:cecutil_iwinposn doesn't exist"
"  endif                                                                                            " Decho
"  echomsg "Decho: SaveWinPosn [".savedposn."]"
  return savedposn
endfun

" ---------------------------------------------------------------------
" RestoreWinPosn: {{{2
"      call RestoreWinPosn()
"      call RestoreWinPosn(winposn)
fun! RestoreWinPosn(...)
"  echomsg "Decho: RestoreWinPosn() a:0=".a:0
"  echomsg "Decho: getline(1)<".getline(1).">"
"  echomsg "Decho: line(.)=".line(".")
  if line("$") == 1 && getline(1) == ""
"   echomsg "Decho: RestoreWinPosn : empty buffer"
   return ""
  endif
  let so_keep   = &l:so
  let siso_keep = &l:siso
  let ss_keep   = &l:ss
  setlocal so=0 siso=0 ss=0

  if a:0 == 0 || a:1 == ""
   " use saved window position in b:cecutil_winposn{b:cecutil_iwinposn} if it exists
   if exists("b:cecutil_iwinposn") && exists("b:cecutil_winposn{b:cecutil_iwinposn}")
"    echomsg "Decho: using stack b:cecutil_winposn{".b:cecutil_iwinposn."}<".b:cecutil_winposn{b:cecutil_iwinposn}.">"
	try
	 exe s:modifier.b:cecutil_winposn{b:cecutil_iwinposn}
	catch /^Vim\%((\a\+)\)\=:E749/
	 " ignore empty buffer error messages
	endtry
	" normally drop top-of-stack by one
	" but while new top-of-stack doesn't exist
	" drop top-of-stack index by one again
	if b:cecutil_iwinposn >= 1
	 unlet b:cecutil_winposn{b:cecutil_iwinposn}
	 let b:cecutil_iwinposn= b:cecutil_iwinposn - 1
	 while b:cecutil_iwinposn >= 1 && !exists("b:cecutil_winposn{b:cecutil_iwinposn}")
	  let b:cecutil_iwinposn= b:cecutil_iwinposn - 1
	 endwhile
	 if b:cecutil_iwinposn < 1
	  unlet b:cecutil_iwinposn
	 endif
	endif
   else
	echohl WarningMsg
	echomsg "***warning*** need to SaveWinPosn first!"
	echohl None
   endif

  else	 " handle input argument
"   echomsg "Decho: using input a:1<".a:1.">"
   " use window position passed to this function
   exe a:1
   " remove a:1 pattern from b:cecutil_winposn{b:cecutil_iwinposn} stack
   if exists("b:cecutil_iwinposn")
	let jwinposn= b:cecutil_iwinposn
	while jwinposn >= 1                     " search for a:1 in iwinposn..1
	 if exists("b:cecutil_winposn{jwinposn}")    " if it exists
	  if a:1 == b:cecutil_winposn{jwinposn}      " and the pattern matches
	   unlet b:cecutil_winposn{jwinposn}            " unlet it
	   if jwinposn == b:cecutil_iwinposn            " if at top-of-stack
		let b:cecutil_iwinposn= b:cecutil_iwinposn - 1      " drop stacktop by one
	   endif
	  endif
	 endif
	 let jwinposn= jwinposn - 1
	endwhile
   endif
  endif

  " Seems to be something odd: vertical motions after RWP
  " cause jump to first column.  The following fixes that.
  " Note: was using wincol()>1, but with signs, a cursor
  " at column 1 yields wincol()==3.  Beeping ensued.
  let vekeep= &ve
  set ve=all
  if virtcol('.') > 1
   exe s:modifier."norm! hl"
  elseif virtcol(".") < virtcol("$")
   exe s:modifier."norm! lh"
  endif
  let &ve= vekeep

  let &l:so   = so_keep
  let &l:siso = siso_keep
  let &l:ss   = ss_keep

"  echomsg "Decho: RestoreWinPosn"
endfun

" ---------------------------------------------------------------------
" s:WinLineRestore: {{{2
fun! s:WinLineRestore(swwline)
"  echomsg "Decho: s:WinLineRestore(swwline=".a:swwline.")"
  while winline() < a:swwline
   let curwinline= winline()
   exe s:modifier."norm! \<c-y>"
   if curwinline == winline()
	break
   endif
  endwhile
"  echomsg "Decho: s:WinLineRestore"
endfun

" ---------------------------------------------------------------------
" GoWinbufnr: go to window holding given buffer (by number) {{{2
"   Prefers current window; if its buffer number doesn't match,
"   then will try from topleft to bottom right
fun! GoWinbufnr(bufnum)
"  call Dfunc("GoWinbufnr(".a:bufnum.")")
  if winbufnr(0) == a:bufnum
"   call Dret("GoWinbufnr : winbufnr(0)==a:bufnum")
   return
  endif
  winc t
  let first=1
  while winbufnr(0) != a:bufnum && (first || winnr() != 1)
  	winc w
	let first= 0
   endwhile
"  call Dret("GoWinbufnr")
endfun

" ---------------------------------------------------------------------
" SaveMark: sets up a string saving a mark position. {{{2
"           For example, SaveMark("a")
"           Also sets up a global variable, g:savemark_{markname}
fun! SaveMark(markname)
"  call Dfunc("SaveMark(markname<".a:markname.">)")
  let markname= a:markname
  if strpart(markname,0,1) !~ '\a'
   let markname= strpart(markname,1,1)
  endif
"  call Decho("markname=".markname)

  let lzkeep  = &lz
  set lz

  if 1 <= line("'".markname) && line("'".markname) <= line("$")
   let winposn               = SaveWinPosn(0)
   exe s:modifier."norm! `".markname
   let savemark              = SaveWinPosn(0)
   let g:savemark_{markname} = savemark
   let savemark              = markname.savemark
   call RestoreWinPosn(winposn)
  else
   let g:savemark_{markname} = ""
   let savemark              = ""
  endif

  let &lz= lzkeep

"  call Dret("SaveMark : savemark<".savemark.">")
  return savemark
endfun

" ---------------------------------------------------------------------
" RestoreMark: {{{2
"   call RestoreMark("a")  -or- call RestoreMark(savemark)
fun! RestoreMark(markname)
"  call Dfunc("RestoreMark(markname<".a:markname.">)")

  if strlen(a:markname) <= 0
"   call Dret("RestoreMark : no such mark")
   return
  endif
  let markname= strpart(a:markname,0,1)
  if markname !~ '\a'
   " handles 'a -> a styles
   let markname= strpart(a:markname,1,1)
  endif
"  call Decho("markname=".markname." strlen(a:markname)=".strlen(a:markname))

  let lzkeep  = &lz
  set lz
  let winposn = SaveWinPosn(0)

  if strlen(a:markname) <= 2
   if exists("g:savemark_{markname}") && strlen(g:savemark_{markname}) != 0
	" use global variable g:savemark_{markname}
"	call Decho("use savemark list")
	call RestoreWinPosn(g:savemark_{markname})
	exe "norm! m".markname
   endif
  else
   " markname is a savemark command (string)
"	call Decho("use savemark command")
   let markcmd= strpart(a:markname,1)
   call RestoreWinPosn(markcmd)
   exe "norm! m".markname
  endif

  call RestoreWinPosn(winposn)
  let &lz       = lzkeep

"  call Dret("RestoreMark")
endfun

" ---------------------------------------------------------------------
" DestroyMark: {{{2
"   call DestroyMark("a")  -- destroys mark
fun! DestroyMark(markname)
"  call Dfunc("DestroyMark(markname<".a:markname.">)")

  " save options and set to standard values
  let reportkeep= &report
  let lzkeep    = &lz
  set lz report=10000

  let markname= strpart(a:markname,0,1)
  if markname !~ '\a'
   " handles 'a -> a styles
   let markname= strpart(a:markname,1,1)
  endif
"  call Decho("markname=".markname)

  let curmod  = &mod
  let winposn = SaveWinPosn(0)
  1
  let lineone = getline(".")
  exe "k".markname
  d
  put! =lineone
  let &mod    = curmod
  call RestoreWinPosn(winposn)

  " restore options to user settings
  let &report = reportkeep
  let &lz     = lzkeep

"  call Dret("DestroyMark")
endfun

" ---------------------------------------------------------------------
" QArgSplitter: to avoid \ processing by <f-args>, <q-args> is needed. {{{2
" However, <q-args> doesn't split at all, so this one returns a list
" with splits at all whitespace (only!), plus a leading length-of-list.
" The resulting list:  qarglist[0] corresponds to a:0
"                      qarglist[i] corresponds to a:{i}
fun! QArgSplitter(qarg)
"  call Dfunc("QArgSplitter(qarg<".a:qarg.">)")
  let qarglist    = split(a:qarg)
  let qarglistlen = len(qarglist)
  let qarglist    = insert(qarglist,qarglistlen)
"  call Dret("QArgSplitter ".string(qarglist))
  return qarglist
endfun

" ---------------------------------------------------------------------
" ListWinPosn: {{{2
"fun! ListWinPosn()                                                        " Decho 
"  if !exists("b:cecutil_iwinposn") || b:cecutil_iwinposn == 0             " Decho 
"   call Decho("nothing on SWP stack")                                     " Decho
"  else                                                                    " Decho
"   let jwinposn= b:cecutil_iwinposn                                       " Decho 
"   while jwinposn >= 1                                                    " Decho 
"    if exists("b:cecutil_winposn{jwinposn}")                              " Decho 
"     call Decho("winposn{".jwinposn."}<".b:cecutil_winposn{jwinposn}.">") " Decho 
"    else                                                                  " Decho 
"     call Decho("winposn{".jwinposn."} -- doesn't exist")                 " Decho 
"    endif                                                                 " Decho 
"    let jwinposn= jwinposn - 1                                            " Decho 
"   endwhile                                                               " Decho 
"  endif                                                                   " Decho
"endfun                                                                    " Decho 
"com! -nargs=0 LWP	call ListWinPosn()                                    " Decho 

" ---------------------------------------------------------------------
" SaveUserMaps: this function sets up a script-variable (s:restoremap) {{{2
"          which can be used to restore user maps later with
"          call RestoreUserMaps()
"
"          mapmode - see :help maparg for details (n v o i c l "")
"                    ex. "n" = Normal
"                    The letters "b" and "u" are optional prefixes;
"                    The "u" means that the map will also be unmapped
"                    The "b" means that the map has a <buffer> qualifier
"                    ex. "un"  = Normal + unmapping
"                    ex. "bn"  = Normal + <buffer>
"                    ex. "bun" = Normal + <buffer> + unmapping
"                    ex. "ubn" = Normal + <buffer> + unmapping
"          maplead - see mapchx
"          mapchx  - "<something>" handled as a single map item.
"                    ex. "<left>"
"                  - "string" a string of single letters which are actually
"                    multiple two-letter maps (using the maplead:
"                    maplead . each_character_in_string)
"                    ex. maplead="\" and mapchx="abc" saves user mappings for
"                        \a, \b, and \c
"                    Of course, if maplead is "", then for mapchx="abc",
"                    mappings for a, b, and c are saved.
"                  - :something  handled as a single map item, w/o the ":"
"                    ex.  mapchx= ":abc" will save a mapping for "abc"
"          suffix  - a string unique to your plugin
"                    ex.  suffix= "DrawIt"
fun! SaveUserMaps(mapmode,maplead,mapchx,suffix)
"  call Dfunc("SaveUserMaps(mapmode<".a:mapmode."> maplead<".a:maplead."> mapchx<".a:mapchx."> suffix<".a:suffix.">)")

  if !exists("s:restoremap_{a:suffix}")
   " initialize restoremap_suffix to null string
   let s:restoremap_{a:suffix}= ""
  endif

  " set up dounmap: if 1, then save and unmap  (a:mapmode leads with a "u")
  "                 if 0, save only
  let mapmode  = a:mapmode
  let dounmap  = 0
  let dobuffer = ""
  while mapmode =~ '^[bu]'
   if     mapmode =~ '^u'
    let dounmap = 1
    let mapmode = strpart(a:mapmode,1)
   elseif mapmode =~ '^b'
    let dobuffer = "<buffer> "
    let mapmode  = strpart(a:mapmode,1)
   endif
  endwhile
"  call Decho("dounmap=".dounmap."  dobuffer<".dobuffer.">")
 
  " save single map :...something...
  if strpart(a:mapchx,0,1) == ':'
"   call Decho("save single map :...something...")
   let amap= strpart(a:mapchx,1)
   if amap == "|" || amap == "\<c-v>"
    let amap= "\<c-v>".amap
   endif
   let amap                    = a:maplead.amap
   let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|:sil! ".mapmode."unmap ".dobuffer.amap
   if maparg(amap,mapmode) != ""
    let maprhs                  = substitute(maparg(amap,mapmode),'|','<bar>','ge')
	let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|:".mapmode."map ".dobuffer.amap." ".maprhs
   endif
   if dounmap
	exe "sil! ".mapmode."unmap ".dobuffer.amap
   endif
 
  " save single map <something>
  elseif strpart(a:mapchx,0,1) == '<'
"   call Decho("save single map <something>")
   let amap       = a:mapchx
   if amap == "|" || amap == "\<c-v>"
    let amap= "\<c-v>".amap
"	call Decho("amap[[".amap."]]")
   endif
   let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|sil! ".mapmode."unmap ".dobuffer.amap
   if maparg(a:mapchx,mapmode) != ""
    let maprhs                  = substitute(maparg(amap,mapmode),'|','<bar>','ge')
	let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|".mapmode."map ".dobuffer.amap." ".maprhs
   endif
   if dounmap
	exe "sil! ".mapmode."unmap ".dobuffer.amap
   endif
 
  " save multiple maps
  else
"   call Decho("save multiple maps")
   let i= 1
   while i <= strlen(a:mapchx)
    let amap= a:maplead.strpart(a:mapchx,i-1,1)
	if amap == "|" || amap == "\<c-v>"
	 let amap= "\<c-v>".amap
	endif
	let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|sil! ".mapmode."unmap ".dobuffer.amap
    if maparg(amap,mapmode) != ""
     let maprhs                  = substitute(maparg(amap,mapmode),'|','<bar>','ge')
	 let s:restoremap_{a:suffix} = s:restoremap_{a:suffix}."|".mapmode."map ".dobuffer.amap." ".maprhs
    endif
	if dounmap
	 exe "sil! ".mapmode."unmap ".dobuffer.amap
	endif
    let i= i + 1
   endwhile
  endif
"  call Dret("SaveUserMaps : restoremap_".a:suffix.": ".s:restoremap_{a:suffix})
endfun

" ---------------------------------------------------------------------
" RestoreUserMaps: {{{2
"   Used to restore user maps saved by SaveUserMaps()
fun! RestoreUserMaps(suffix)
"  call Dfunc("RestoreUserMaps(suffix<".a:suffix.">)")
  if exists("s:restoremap_{a:suffix}")
   let s:restoremap_{a:suffix}= substitute(s:restoremap_{a:suffix},'|\s*$','','e')
   if s:restoremap_{a:suffix} != ""
"   	call Decho("exe ".s:restoremap_{a:suffix})
    exe "sil! ".s:restoremap_{a:suffix}
   endif
   unlet s:restoremap_{a:suffix}
  endif
"  call Dret("RestoreUserMaps")
endfun

" ==============
"  Restore: {{{1
" ==============
let &cpo= s:keepcpo
unlet s:keepcpo

" ================
"  Modelines: {{{1
" ================
" vim: ts=4 fdm=marker
doc/cecutil.txt	[[[1
255
*cecutil.txt*	DrChip's Utilities				Apr 05, 2010

Author:  Charles E. Campbell  <NdrOchip@ScampbellPfamily.AbizM>
	  (remove NOSPAM from Campbell's email first)
Copyright: (c) 2004-2006 by Charles E. Campbell		*cecutil-copyright*
           The VIM LICENSE applies to cecutil.vim and cecutil.txt
           (see |copyright|) except use "cecutil" instead of "Vim"
	   No warranty, express or implied.  Use At-Your-Own-Risk.

==============================================================================
1. Contents					*cecutil* *cecutil-contents*

	1. Contents.................: |cecutil-contents|
	2. Positioning..............: |cecutil-posn|
	3. Marks....................: |cecutil-marks|
	4. Maps.....................: |cecutil-maps|
	5. History..................: |cecutil-history|

==============================================================================
2. Positioning				*cecutil-posn*	*cecutil-position*

    let winposn= SaveWinPosn()				*cecutil-savewinposn*

	This operation will save window position in winposn variable and
	on a (buffer local) b:winposn{} stack.

    call SaveWinPosn()

	This function will save window position in b:winposn{b:iwinposn}

    let winposn= SaveWinPosn(0)

	This operation will _only_ save the window position in winposn variable.
	Ie. the window position will not appear on the b:winposn{} stack.  You
	will then need to use RestoreWinPosn(winposn) to restore to this window
	position.

    call RestoreWinPosn()				*cecutil-restorewinposn*

	This function call will use the local buffer b:winposn{} stack to
	restore the last window position saved therein.  It will also
	pop the stack.

    call RestoreWinPosn(winposn)

	This function call will use the winposn variable and restore
	the window position accordingly.  It will also search the
	stack and remove any similar entry from the stack.

			*cecutil-map* *cecutil-cmd* *cecutil-swp* *cecutil-rwp*
    \swp : save current window position (uses the b:winposn{} stack)
    :SWP   like \swp, but provided as a command

    \rwp : restore window position      (uses the b:winposn{} stack)
    :RWP   like \rwp, but provided as a command

==============================================================================
3. Marks						*cecutil-marks*

    call SaveMark(markname)				*cecutil-savemark*
    let savemark= SaveMark(markname)
    SM markname >

		ex. call SaveMark("a")
		let savemarkb= SaveMark("b")
		:SM a
<
	This function saves a string in the global variable >
		g:savemark_{markname}
<	which contains sufficient information to completely restore the
	position of a mark.  It also returns that string.

   call RestoreMark(markname)				*cecutil-restoremark*
   call RestoreMark(savemark)

	This function either takes a single-character string (ex. "a") and uses
	g:savemark_{markname} to restore the mark position or assumes that
	the string passed to it is a SaveMark() string (and uses it to restore
	the mark). >

		ex. call RestoreMark("a")
		    call RestoreMark(savemarkb)
		    :RM a
<

   call DestroyMark(markname)				*cecutil-destroymark*

	The DestroyMark() function completely removes a mark.  It does this
	by saving the window position, copying line one, putting the
	to-be-destroyed mark on that new line, deleting the new line, and
	then restoring the window position.  The windows' modified status
	is preserved. >

		ex. call DestroyMark("a")
		    :DM a
<

==============================================================================
4.Maps							*cecutil-maps*
							*cecutil-saveusermaps*
    call SaveUserMaps(mapmode,maplead,mapchx,suffix)

	This function sets up a script-variable (ie. a variable that can
	generally be accessed only from within cecutil's own functions; see
	|s:var|) called s:restoremap_SUFFIX, where the suffix is specified by
	the "suffix" argument.

	The selected user's maps are saved by appending a restoration command
	to this variable; the RestoreUserMaps() (|cecutil-restoreusermaps|)
	function uses the contents of this variable to restore user maps.

		mapmode	- (see |maparg()|for additional information)
			  leading "u": SaveUserMaps() will unmap any existing
			               map matches after saving them
			  leading "b": the map(s) have a <buffer> qualifier
			  ""         : normal, visual, and operator-pending
			  "n"        : normal mode maps
			  "o"        : operator pending maps
			  "i"        : insert mode maps
			  "c"        : command line maps
			  "l"        : language map (see |language-mapping|) >
			    ex. "un"  = Normal + unmapping
			    ex. "bn"  = Normal + <buffer>
			    ex. "bun" = Normal + <buffer> + unmapping
			    ex. "ubn" = Normal + <buffer> + unmapping
<		maplead - The single letter maps being saved are assumed to have
			  the form >
				maplead . each_character_in_string
<			  ex. maplead="\" and mapchx="abc" saves mappings for >
			    \a, \b, and \c
<			  Of course, if maplead is "", then for mapchx="abc",
			  mappings for just a, b, and c are saved.
		mapchx	- This argument specifies which mapped keys to save.
			- "<something>" handled as a single map item. >
			  ex. "<left>"
<       		- "string" a string of single letters which are actually
			  multiple two-letter maps (ie. maplead + character).
			- :something  handled as a single map item, w/o the ":" >
			  ex.  mapchx= ":abc"
<			  will save the user mapping for "abc"
		suffix  - a string unique to your plugin >
			  ex.  suffix= "DrawIt"
<			  This suffix is appended to the internal save
			  variable name.

	Some examples follow: >

		call SaveUserMaps("n","","webWEBjklh$0%;,nN","HiMtchBrkt")
<		mapmode is "n" : normal maps are to be saved
		maplead is ""  : no mapleader is used
		mapchx         : normal mode maps for w, e, b, W, E, B, j,
		                 k, l, etc (if any) are all saved
		suffix         : saving is done using the variable
		                 s:restoremaps_HiMtchBrkt >

		call SaveUserMaps("n",'\',"webWEBjklh$0%;,nN","HiMtchBrkt")
<		This example is just like the previous one, except that
		maplead is '\' : so normal mode maps for \w, \e, \b, ...
		                 will be saved. >

		call SaveUserMaps("n","","<up>","DrawIt")
<		The normal mode map (if any) for the <up> key is saved in
		the variable s:restoremaps_DrawIt >

		call SaveUserMaps("n","",":F(","HiMtchBrkt")
<		The normal mode map for >
			F(
<		(if any) is saved in the variable s:restoremaps_HiMtchBrkt

    call RestoreUserMaps(suffix)

    	The usermaps saved by SaveUserMaps() with the given suffix will be
	restored (ie. s:restoremaps_{suffix}).  Example: >

		call RestoreUserMaps("HiMtchBrkt")
<		will restore all user maps redefined for the HiMtchBrkt plugin


==============================================================================
5. History						*cecutil-history* {{{1

	v18 Aug 27, 2008 : * after norm! 0 (ie. cursor at left hand side),
			     a wincol() normally returns 1.  However, with
			     signs enabled, wincol() returned 3, and the
			     result was that RestoreWinPosn() was beeping
			     (near the "seems to be something odd" comment)
	    Aug 20, 2009   * changed some keep&restore options to use local
			     options rather than global ones.
			   * adjust saved window column for being past the
			     end-of-line (which can happen with |'virtualedit'|)
			   * with wrap enabled, lines longer than the
	                     window width (which take several screen lines)
			     caused SaveWinPosn() to not restore the window
			     line correctly.
			   * fixed some map save and restore issues with
			     handling <buffer> maps
	    Apr 05, 2010   * (Greg Klein) keepjumps used more often to prevent
			     adding unwanted lines to the jump table (|jumps|)
			   * (Greg Klein) moved screenline adjusting to a
			     separate function (s:WinLineRestore) as having a
			     while loop embedded in a string for execution,
			     even with |:keepjumps|, added lines to the jump
			     table
			   * (Greg Klein) fixed s:WinLineRestore() so that it
			     wouldn't hang on shorter than a screen text but
			     having longer than screenwidth lines.
	v17 Sep 04, 2007 : * new function, QArgSplitter(), included
	v16 Oct 30, 2006 : * com -> com! so AsNeeded is happier
	    Feb 12, 2007   * fixed a bug where :somemap (a map of "somemap")
			     did not use the optional mapleader (so it'd be
			     a map of "\somemap", if "\" is the mapleader).
			     (problem pointed out by Michael Zhang)
	v15 Jan 25, 2006 : * bypass for report option for DestroyMark() included
	                   * SaveWinPosn() and RestoreWinPosn() now handle an
			     empty buffer
			   * b:(varname) now use b:cecutil_(varname)
			   * map restoration improved
	v14 Jan 23, 2006 : * bypasses for si, so, and siso options included
	    Jan 25, 2006   * SaveUserMaps' mapmode argument, heretofore just
	                     a single letter (see |maparg()|), now accepts a
			     leading "u".  If present, SaveUserMaps() will
			     do an unmap.
	v13 Jan 12, 2006 : * SaveUserMaps() was saving user maps but then also
	                     unmap'ing them.  HiMtchBrkt needed to append a
	                     function call to maps, not overwrite them.  So
	                     the new SaveUserMaps() just saves user maps,
	                     leaving their definitions in place.
	   Jan 18, 2006    * keepjumps used to avoid jumplist changes when
	                     using SaveWinPosn() and RestoreWinPosn()
	v12 Dec 29, 2005 : * bugfix (affected Mines.vim)
	v11 Dec 29, 2005 : * two new functions (SaveUserMaps() and
	                     RestoreUserMaps() )
	v10 Nov 22, 2005 : * SaveWinPosn bugfix
	v9  Jun 02, 2005 : * <q-args> produces a "" argument when there are
	                     no arguments, which caused difficulties.  Fixed.
	v8  Apr 22, 2005 : * <q-args> used to handle marknames with commands
	                     Thus, :DM a  will delete mark a
	v7  Mar 10, 2005 : * removed zO from saved window position; caused
	                     problems with ftplugin/currfunc.vim
	                   * doing a SWP and RWP on an empty buffer produced
	                     "empty buffer" messages; now these are ignored
	    Apr 13, 2005   * command (SWP RWP MP SP etc) now have -bar so
	                     that the "|" can be used to chain such commands
	v6  Feb 17, 2005 : * improved SaveMark() and RestoreMark()
	v5  Jan 18, 2005 : * s:loaded_winposn changed to g:loaded_cecutil
	v4  Oct 25, 2004 : * changed com! to com so that error messages will
	                     be given when there's a command-name conflict
	v3  May 19, 2004 : * bugfix: the sequence \swp\rwp wasn't working right
	                   * bugfix: \swp...\rwp was echoing the current
	                     line when the \rwp should've been silent
	                   * improved Dfunc/Decho/Dret debugging


==============================================================================
vim:tw=78:ts=8:ft=help:fdm=marker
