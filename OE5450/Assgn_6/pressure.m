clc;
clear;

P = readmatrix('output_pr.txt');

imagesc(P)
set(gca, 'YTickLabel', 0.9:-0.1:0)
set(gca, 'XTickLabel', 0.1:0.1:1)
