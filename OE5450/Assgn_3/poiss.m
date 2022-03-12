clc;
clear;

T = readmatrix('output_2.txt');


imagesc(T)
%set(gca, 'YDir','normal')
set(gca, 'YTickLabel', [])
%title('41x41 Grid')
xlabel('X')
ylabel('Y')
colorbar