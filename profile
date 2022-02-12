#
# ~/.profile
#

# Set our umask
umask 022

# Termcap is outdated, old, and crusty, kill it.
unset TERMCAP

# Man is much better than us at figuring this out
unset MANPATH


# Set default configurations and paths
export BASH_SILENCE_DEPRECATION_WARNING=1
export HOMEBREW_FORCE_BREWED_CURL=1
export HOMEBREW_FORCE_BREWED_GIT=1

export FIGNORE=$FIGNORE:DS_Store

export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"

export PATH="/opt/homebrew/bin:/usr/lib/ccache/:$PATH"
export PATH="$PATH:$JAVA_HOME:/usr/lib/gcc"

if command -v pyenv 1>/dev/null 2>&1; then
	export PYENV_ROOT="$HOME/.pyenv"
	export PATH="$PYENV_ROOT/bin:$PATH"
	eval "$(pyenv init --path)"
fi

# Set PATH so it includes user's private bin if it exists
if [ -d "$HOME/Bin" ] ; then
	PATH="$HOME/Bin:$PATH"
elif [ -d "$HOME/bin" ] ; then
	PATH="$HOME/bin:$PATH"
fi
