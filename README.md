# dotfiles

The goal for this repo is to make it easier to setup a proper shell enviornment
for myself and to help create a simple dotfile framework for others to use. 
By storing my dotfiles in a Git repository, one can create a simple organized system 
to automate and sync personalized dotfiles from setup to setup.

My dotfiles currently include:
- bash_profile/bash_logout/profile/bashrc
- vim/vimrc
- gitconfig
- tmux config

# Getting Started
Clone this repo to your local machine:

`git clone https://github.com/tunneln/dotfiles.git`

If you want to make use of the dotfiles framework and make additions/modifiactions to the dotfiles, read ahead

If you just want to use these dotfiles on your system, simply type

`cd dotfiles && sh install.sh`

# The Installation Script
The installation script is a bash sript called install.sh

##What it does
**First** The script will start off by making a backup directory to store your current - and subsequent - dotfiles.

**Next** the script will clean up any old symlinks/dotfiles by individually moving all of them into the backup folder ('~/.old_dotfiles/')

**Lastly** the script will create soft links in your home directory that point to the new dotfiles folder

##Running the script
Finally, to 'install' the dotfiles into your system

Type `chmod +x install.sh`

and then `./install.sh` to run the script

or simply run `sh install.sh`

#Adding your own dotfiles
To add or modify the dot files, simply copy over any given dot file from your home directory into the dotfiles folder and run the install script. Your personal dotfiles should all now be updated and symlinked.

**Be sure to cp the file over without a dot**  
e.g.` cp ~/.urxvt ~/dotfiles/urxvt `

