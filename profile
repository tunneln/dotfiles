#Set our umask
umask 022

# Set our default paths
export PATH=/Users/nnegusse/bin/apache-maven-3.5.0/bin:~/Documents/Apps/homebrew/bin/:~/bin/:/usr/lib/ccache/:$PATH
export PATH=$PATH:/usr/lib/gcc:/usr/bin/gcc:/usr/bin/g++
export PATH=$PATH:/usr/lib/gcc:/usr/bin/gcc:/usr/bin/g++
export PATH

# Load profiles from /etc/profile.d
if test -d /etc/profile.d/; then
	for profile in /etc/profile.d/*.sh; do
		test -r "$profile" && . "$profile"
	done
	unset profile
fi

# Source global bash config
if test "$PS1" && test "$BASH" && test -r /etc/bash.bashrc; then
	. /etc/bash.bashrc
fi

# if running bash
if [ -n "$BASH_VERSION" ]; then
	# include .bashrc if it exists
	if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
	fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
	PATH="$HOME/bin:$PATH"
fi

# Termcap is outdated, old, and crusty, kill it.
unset TERMCAP

# Man is much better than us at figuring this out
unset MANPATH
