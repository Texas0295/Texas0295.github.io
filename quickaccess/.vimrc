set termguicolors
set shortmess+=I
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
set number
set mouse=a
set showmode
autocmd VimEnter * set clipboard=unnamedplus
set breakindent
set undofile
set ignorecase
set smartcase
set signcolumn=no
set updatetime=250
set timeoutlen=300
set splitright
set splitbelow
set list
set listchars=tab:>-,trail:.,nbsp:_
set cursorline
set scrolloff=10
set relativenumber

set fenc=utf-8
set nobackup
set noswapfile
set autoread
set hidden
set showcmd

set virtualedit=onemore
set smartindent
set showmatch
set laststatus=2
set wildmode=list:longest
syntax enable

set incsearch
set wrapscan
set hlsearch

nmap <Esc><Esc> :nohlsearch<CR><Esc>

nnoremap <C-h> <C-w><C-h>
nnoremap <C-l> <C-w><C-l>
nnoremap <C-j> <C-w><C-j>
nnoremap <C-k> <C-w><C-k>
nnoremap <Esc> :nohlsearch<CR>

" Disable netrw plugin
let g:loaded_netrw = 1
let g:loaded_netrwPlugin = 1

" Set leader key
let mapleader = " "
let maplocalleader = " "
