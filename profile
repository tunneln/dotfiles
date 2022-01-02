#Set our umask
umask 022

# Set our default paths
export FIGNORE=$FIGNORE:DS_Store
export PATH=/usr/lib/ccache/:$PATH:/usr/lib/gcc:/usr/bin/gcc:/usr/bin/g++

# Source global bash config
if test "$PS1" && test "$BASH" && test -r /etc/bash.bashrc; then
	. /etc/bash.bashrc
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
	PATH="$HOME/bin:$PATH"
fi

if [ -d "$HOME/Bin" ] ; then
	PATH="$HOME/Bin:$PATH"
fi

# Termcap is outdated, old, and crusty, kill it.
unset TERMCAP

# Man is much better than us at figuring this out
unset MANPATH
