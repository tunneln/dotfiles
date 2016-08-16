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
    
    # checks if to-be-backed-up file exists and is not a symlink
    if [ -a $dotfi ] && [ ! \( -L $dotfi \) ]; then            
        rm -rf $olddir/$finame       
   		mv $dotfi $olddir/$finame
	 	echo "...done"
    else
		cp -rf $file $olddir
		echo "$dotfi either doesn't exist or is a symlink
		"
	fi

	# checks if to-be-linked file exists
	if [ -a $dir/$finame ]; then 
		echo "Creating symlink of $finame in your HOME directory as \".$finame\"	
		"
            rm -rf $dotfi
    		ln -sf $file $dotfi
	fi
   
    # checks if a vim file and if plugins can be installed
    if [ $finame == "vim" ] && [ -a $file/bundle ]; then
      	echo "Updating and installing all vim plugins and adding 'backups' folder"
        git submodule update --init --recursive
        vim +PluginInstall +qall
		mkdir -p vim/backups
    fi

    # Applies tmux config if added 
    if [ $finame == "tmux.conf" ]; then
		if [ -a /usr/bin/tmux ] || [ -a /usr/local/bin/tmux ]; then
        	echo "Applying tmux config"
        	tmux source-file ~/.tmux.conf
		fi
    fi 
done

