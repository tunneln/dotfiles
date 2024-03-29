#
# ~/.bash_aliases
#

# enable color support of ls and some handy aliases
if [ -x /usr/bin/dircolors ]; then
	test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
	alias ls='ls --color=auto'
	#alias dir='dir --color=auto'
	#alias vdir='vdir --color=auto'

	alias grep='grep --color=auto'
	alias fgrep='fgrep --color=auto'
	alias egrep='egrep --color=auto'
fi

# some more aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

alias vi='vim'

if [ ! -x $BREW_PREFIX_PATH/bin/trash ] && [ ! -x /usr/local/Cellar/trash ]; then
	alias trash='rmtrash'
fi

alias sudo='sudo -E'
if [ -x /usr/bin/pacaur ]; then
	alias pacman='pacaur'
fi

alias gcc='gcc -Wall'
alias g++='g++ -Wall'

alias grep='grep --color=always'

alias gpf='git push --force-with-lease'

# Alias for 'git up' command
git config --global alias.up '!git remote update -p; git merge --ff-only @{u}'

# Add an "alert" alias for long running commands.  Use like so:
# sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
