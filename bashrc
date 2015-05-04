#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
#PS1='[\u@\h \W]\$ ' #DEFAULT
PS1='\[\e[0;34m\][\u@\h \W]\$\[\e[0m\] '

export RECYCLEBIN=/home/noel/RECYCLEBIN/
