clc;
clear;

P = readmatrix('p.txt');

imagesc(P)
title('Pressure')
%set(gca, 'YDir', 'normal')
set(gca, 'YTickLabel', 0.9:-0.1:0)
set(gca, 'XTickLabel', 0.1:0.1:1)
colorbar
