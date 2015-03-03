#!/bin/bash
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Noel T. Negusse
# .link_dotfiles.sh
# A simple script to install and automate the process of updating dotfiles
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Variables+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#CHANGE VARIABLES ACCORDINGLY

dir=~/GitHubRepos/dotfiles         # dotfiles directory
olddir=~/.dotfiles_old             # old dotfiles backup directory
files="bashrc bash_profile profile urxvt vim vimrc xbindkeysrc Xdefaults xinitrc Xmodmap Xresources zshrc oh-my-zsh gitconfig"    # list of files/folders to symlink in homedir

#Do Work+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# A. Create dotfiles_old in homedir
# B. ~ dotsfiles -> $olddir NEXT create soft links to dotfiles in $HOME 

#A.
echo "Creating $olddir for backup of any existing dotfiles in home directory"
mkdir -p $olddir
echo "...done
"

echo "Changing to the $dir directory"
cd $dir
echo "...done
"

#B.
for file in $files; do
	echo "###############################NEXT FILE###############################"
	echo "Attempting to backup ~/.$file to $olddir ..."
    	if [ -a ~/.$file ]; then #checks if to-be-backed-up file exists
   		mv ~/.$file $olddir
	 	echo "...done"
	else
		echo "~/.$file does not exist
		"
	fi
	
	if [ -a $dir/$file ]; then #checks if to-be-linked file exists
		echo "Creating symlink of $file in $HOME as \".$file\"		
		"
    		ln -s $dir/$file ~/.$file
	fi
done
