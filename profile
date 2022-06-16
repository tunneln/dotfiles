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
export HOMEBREW_FORCE_BREWED_CURL=1
export HOMEBREW_FORCE_BREWED_GIT=1

export GIT_REPOS_ROOT="$HOME/git"

export FIGNORE=$FIGNORE:DS_Store

export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"

export BASH_COMPLETION_COMPAT_DIR="/usr/local/etc/bash_completion.d"
[[ -r "/usr/local/etc/profile.d/bash_completion.sh"  ]] && . "/usr/local/etc/profile.d/bash_completion.sh"

export PATH="$(brew --prefix)/bin:/usr/lib/ccache/:$(brew --prefix)/opt/make/libexec/gnubin:$PATH"
export PATH="$PATH:$JAVA_HOME:/usr/lib/gcc"

if command -v pyenv 1>/dev/null 2>&1; then
	export PYENV_ROOT="$HOME/.pyenv"
	export PATH="$PYENV_ROOT/bin:$PATH"
	eval "$(pyenv init --path)"
fi

# Set PATH so it includes user's local bin if it exists
if [ -d "$HOME/Bin" ] ; then
	PATH="$PATH:$HOME/Bin"
elif [ -d "$HOME/bin" ] ; then
	PATH="$PATH:$HOME/bin"
fi
