# My dotfiles
# About
These are my configuration files for my linux tools. 
Currently these tools include:
- urxvt
- vim
- X*
- bash_profile
- bashrc
- gitconfig

ALSO:
- Miscellaneous scripts (for myself)



The goal for this repo is to make it easier to setup a proper programming enviornment
for myself and help create a framework for others on additional computers. 
By storing my dotfiles in a Git repository, I can create a simple organized system 
to automate and sync my dotfiles from setup to setup.

My secondary goal is to collaborate with others and share ideas for more interesting 
and effecient dotfile configurations.


# Getting Started 
###Quick Start
Clone this repo to your local machine:
`git clone https://github.com/tunneln/dotfiles.git`,
preferably to your home directory or where you store other git repos

###Quick Start w/ Forks
This is the preferred method if you want to contribute to my configurations with changes/additions
or if you just want to keep up to date with my dotfiles.

This could also probably be seen as a simple introduction to using forks....

**Step 1** Fork this repo

**Step 2** Clone your forked repo into your local machine

` $ git clone https://github.com/your-username/dotfiles `

**Step 3** Add the upstream source to the cloned repo. In the folder type

` $ git remote add upstream https://github.com/tunneln/dotfiles `

**Step 4** Lastly, any time you want to sync/update your Forked repo w/ the upstream (tunneln/dotfiles). Type
```
 $ git fetch upstream (download the upstream source)
 $ git checkout master (go into your local master branch)
 $ git merge upstream/master (merge the upstream's master branch with your own local master branch)
```

# The Installation Script
The installation script is a bash file located in `dotfiles/Automate_Install/`

###What it does
**First** The script will start off by making a backup directory (of your specifications, see *Variable 2*) to store your current - and subsequent - dotfiles in.

**Next** the script will clean up any old symlinks/dotfiles by individually moving all of them (that you specified, see *Variable 3*) into the backup folder

**Lastly** the script will create soft links in your home directory that point to the new dotfiles (see *Variable 1*)

**NOTE**: The script will not affect any dotfile not specified by *Variable 3*.

###Customizing the Script
The script has 3 variables, clearly marked, that you will **HAVE TO EDIT** to install the dotfiles.

*NOTE*: install.sh currently contains my personal configuration

1. Variable 1: **dir**
	* Contains the directory of wherever you cloned/placed the repo, e.g.` dir=~/dotfiles `. 
		This will be the directory where you store all of your dotfiles
2. Variable 2: **olddir**
	* Contains the directory of your old dotfiles that the script will create for you. 
	  This will be the backup of the current dot files in your home directory and will be a newly created folder, e.g.` olddir=~/dotfiles_old `
	
		*NOTE*: The script will make the folder for you
3. Variable 3: **files**
	* Contains the list of files/folders in your dotfiles folder which you want to symlink in your homedirectory and backup, e.g.` files="bashrc vim vimrc etc" `
				DO NOT ADD DOTS ('.')

###Install
Finally, to 'install' the dotfiles into your system
Go into /dotfiles/Automate_Install/ and type `chmod +x install.sh`
and then `./install.sh` to run the script

#Adding your own dotfiles
To add your own dot files simply move over any given dot file from your home directory into dotfiles/
with the mv command. 

**Be sure to mv the file over without a dot**  e.g.` mv ~/.urxvt ~/dotfiles/urxvt `

Then all you have to do is add the dotfile's name to the list of files in *Variable 3*

e.g. change `files="bashrc vim vimrc"` to `files="bashrc vim vimrc urxvt"`

####Enjoy!

