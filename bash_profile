#
# ~/.bash_profile
#

# Turn off Mouse Acceleration when on OSX systems
defaults write .GlobalPreferences com.apple.mouse.scaling -1

# Source iTerm2 shell integration when on OSX systems
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# Clearing PATH before path_helper in the global profile can execute and prepend to my custom PATH
# Use Case: Tmux will always call /etc/profile when run which causes pathing issues during sessions
if [ -f /etc/profile  ]; then
	PATH=""
	source /etc/profile
fi

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
