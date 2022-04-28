clc;
clear;

%T = readmatrix('output_psi.txt');
u = readmatrix('u.txt');
v = readmatrix('v.txt');


%imagesc(flip(T))

%set(gca, 'YDir','normal')
%set(gca, 'YTickLabel', 0.9:-0.1:0)
%set(gca, 'XTickLabel', [0.2 0.4 0.6 0.8 1])
%xlabel('X')
%ylabel('Y')
%colorbar
%hold on;
streamslice(flip(u),flip(v));
title('Streamlines')
axis tight
set(gca, 'YTickLabel', 0.1:0.1:1)
set(gca, 'XTickLabel', 0.1:0.1:1)
