#!/bin/bash
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Noel T. Negusse
# .link_dotfiles.sh
# A simple script to install and automate the process of updating dotfiles
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Variables+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#CHANGE VARIABLES ACCORDINGLY

dir="$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )"   # dotfiles directory
olddir=$HOME/.old_dotfiles                                  # old dotfiles backup directory
files=$dir/*                                                # retrieving given dotfiles

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
    finame=${file##*/}
    dotfi=$HOME/.$finame
    if [ $finame == "README.md" -o $finame == "install.sh" ]; then
        continue
    fi
	echo "############################### NEXT FILE ###############################"
	echo "Attempting to backup $dotfi to $olddir ..."
    
    # checks if to-be-backed-up file exists
    if [ -a $dotfi ]; then                                  
   		mv $dotfi $olddir/${finame#"."}
	 	echo "...done"
    else
		echo "$dotfi DOES NOT EXIST
		"
	fi

	# checks if to-be-linked file exists
	if [ -a $dir/$finame ]; then 
		echo "Creating symlink of $finame in your HOME directory as \".$finame\"	
		"
    		ln -sf $file $dotfi
	fi
   
    # checks if file is a vim file and if plugins can be installed
    if [ $finame == "vim" -a $file/bundle ]; then
        echo "Updating and installing all vim plugins"
        git submodule update --init --recursive
        vim +PluginInstall +qall
    fi

done

