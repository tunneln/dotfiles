#
# ~/.bash_profile
#

# Turn off Mouse Acceleration when on OSX systems
defaults write .GlobalPreferences com.apple.mouse.scaling -1

# Source iTerm2 shell integration when on OSX systems
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# Load global profile from /etc/profile.d
if test -d /etc/profile.d/; then
	for profile in /etc/profile.d/*.sh; do
		test -r "$profile" && . "$profile"
	done
	unset profile
fi

[[ -f ~/.profile ]] && . ~/.profile

# Load global bash config
if test "$PS1" && test "$BASH" && test -r /etc/bash.bashrc; then
	. /etc/bash.bashrc
fi

[[ -f ~/.bashrc ]] && . ~/.bashrc


## START OF BITGO CONFIG

# Put python packages in $PATH
PATH=$HOME/Library/Python/2.7/bin:$PATH

# Setup gpg-agent for ssh use
ENVFILE="$HOME/.gnupg/gpg-agent.env"

if ( [[ ! -e "$HOME/.gnupg/S.gpg-agent" ]] && \
     [[ ! -e "/var/run/user/$(id -u)/gnupg/S.gpg-agent" ]] ) ||
   ( [[ ! -s "$ENVFILE" ]] );
then
  if [[ ! -d "$HOME/.gnupg" ]]; then
    echo 'Create ~/.gnupg directory'
    mkdir -m 700 "$HOME/.gnupg"
  fi
  if [[ ! -f "$HOME/.gnupg/gpg-agent.conf" ]]; then
    echo 'Set pinentry-mac to default gpg pinentry in ~/.gnupg/gpg-agent.conf'
    echo "pinentry-program /opt/homebrew/bin/pinentry-mac" > "$HOME/.gnupg/gpg-agent.conf"
  fi

  echo "Reloading scdaemon and gpg-agent, creating .env file: $ENVFILE"
  killall pinentry > /dev/null 2>&1
  gpgconf --reload scdaemon > /dev/null 2>&1
  killall -9 gpg-agent > /dev/null 2>&1
  gpg-agent --daemon --enable-ssh-support > "$ENVFILE"
fi

# Wake up smartcard to avoid races
gpg --card-status > /dev/null 2>&1

source "$ENVFILE"

# Setup nvm
if [[ ! -d "$HOME/.nvm" ]]; then
  mkdir ~/.nvm
fi

export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"

## END OF BITGO CONFIG
