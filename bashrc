#
# ~/.bashrc
#

# If not running interactively, don't do anything
case $- in
	*i*) ;;
		*) return;;
esac

# Don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# For setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# Check the window size after each command and, if necessary,
# Update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
# shopt -s globstar

# Make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# Set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
	debian_chroot=$(cat /etc/debian_chroot)
fi

# Set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
	xterm-color) color_prompt=yes;;
esac

# Uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
# force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
	if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
		# We have color support; assume it's compliant with Ecma-48
		# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
		# a case would tend to support setf rather than setaf.)
		color_prompt=yes
	else
		color_prompt=
	fi
fi

if [ -a /usr/bin/lsb_release ]; then
	dist=$(lsb_release -i)
else
	dist=
fi

system=$(uname -s)

if [ "$dist" = "Distributor ID: Ubuntu" ]; then
	if [ "$color_prompt" = "yes" ]; then
		PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
	else
		PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
	fi
	unset color_prompt force_color_prompt

	# If this is an xterm set the title to user@host:dir
	case "$TERM" in
	xterm*|rxvt*)
		PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
		;;
	*)
		;;
	esac
elif [ "$dist" = "Distributor ID: ARCH" ]; then
	PS1='\[\e[0;34m\][\u@\h \W]\$\[\e[0m\] '
elif [ "$system" = "Darwin" ]; then
	PS1='\h:\W \u\$ '
	alias ls='ls -G'
else
	PS1='\[\e[0;34m\][\u@\h \W]\$\[\e[0m\] '
fi

export PS1="$(tput bold)$(tput setb 5)$PS1$(tput sgr0)"

# Alias definitions.
if [ -f ~/.bash_aliases ]; then
	. ~/.bash_aliases
fi

# Enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
	if [ -f /usr/share/bash-completion/bash_completion ]; then
		. /usr/share/bash-completion/bash_completion
	elif [ -f /etc/bash_completion ]; then
		. /etc/bash_completion
	fi
fi

# Load Proxy Settings
if [ -f ~/.bash_proxy ]; then
	. ~/.bash_proxy
fi

# Commented out until gpg agent is setup on laptop
# Setup gpg-agent for ssh use
#ENVFILE="$HOME/.gnupg/gpg-agent.env"
#
#if ( [[ ! -e "$HOME/.gnupg/S.gpg-agent" ]] && \
#     [[ ! -e "/var/run/user/$(id -u)/gnupg/S.gpg-agent" ]] ) ||
#   ( [[ ! -s "$ENVFILE" ]] );
#then
#  if [[ ! -d "$HOME/.gnupg" ]]; then
#    echo 'Create ~/.gnupg directory'
#    mkdir -m 700 "$HOME/.gnupg"
#  fi
#  if [[ ! -f "$HOME/.gnupg/gpg-agent.conf" ]]; then
#    echo 'Set pinentry-mac to default gpg pinentry in ~/.gnupg/gpg-agent.conf'
#    echo "pinentry-program $BREW_PREFIX_PATH/bin/pinentry-mac" > "$HOME/.gnupg/gpg-agent.conf"
#  fi
#
#  echo "Reloading scdaemon and gpg-agent, creating .env file: $ENVFILE"
#  killall pinentry > /dev/null 2>&1
#  gpgconf --reload scdaemon > /dev/null 2>&1
#  killall -9 gpg-agent > /dev/null 2>&1
#  gpg-agent --daemon --enable-ssh-support > "$ENVFILE"
#fi
#
## Wake up smartcard to avoid races
#gpg --card-status > /dev/null 2>&1
#
#source "$ENVFILE"

# Load NVM script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
