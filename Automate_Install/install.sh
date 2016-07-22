#!/bin/bash
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Noel T. Negusse
# .link_dotfiles.sh
# A simple script to install and automate the process of updating dotfiles
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Variables+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#CHANGE VARIABLES ACCORDINGLY

dir=~/GithubRepos/dotfiles         # dotfiles directory
olddir=~/.dotfiles_old             # old dotfiles backup directory
files="bashrc profile vim vimrc gitconfig"    # list of files/folders to symlink in homedir

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
   		cp -r ~/.$file $olddir
		rm ~/.$file
	 	echo "...done"
	else
		echo "~/.$file DOES NOT EXIST
		"
	fi
	
	if [ -a $dir/$file ]; then #checks if to-be-linked file exists
		echo "Creating symlink of $file in $HOME as \".$file\"		
		"
    		ln -sf $dir/$file ~/.$file
	fi
done
