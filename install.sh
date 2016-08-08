#!/bin/bash
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Noel T. Negusse
# .link_dotfiles.sh
# A simple script to install and automate the process of updating dotfiles
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Variables+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#CHANGE VARIABLES ACCORDINGLY

dir=$PWD                    # dotfiles directory
olddir=$HOME/.old_dotfiles  # old dotfiles backup directory
files=$dir/*

#Do Work+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# A. Create backup dotfiles folder in homedir
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
    dotfi=~/.${file##*/}
    finame=${file##*/}
	echo "############################### NEXT FILE ###############################"
	echo "Attempting to backup $dotfi to $olddir ..."
    # Checks if to-be-backed-up file exists
    if [ -a $dotfi ]; then                                  
   		cp -r $dotfi $olddir
		rm $dotfi
	 	echo "...done"
    elif [ -a $finame == "install.sh" ]; then
        :
    else
		echo "$dotfi DOES NOT EXIST
		"
	fi

	#checks if to-be-linked file exists
	if [ -a $dir/$finame -a "install.sh" != $finame ]; then 
		echo "Creating symlink of $finame in your HOME directory as \".$finame\"	
		"
    		ln -sf $file $dotfi
	fi
   
    # Checks if file is a vim file and if plugins can be installed
    if [ $finame == "vimrc" -a $file/bundle ]; then              
        vim +PluginInstall +qall
    fi

done

