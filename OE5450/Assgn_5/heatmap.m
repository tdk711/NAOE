clc;
clear;

T = readmatrix('output_1.txt');

imagesc(T);
set(gca, 'YDir','normal')
set(gca, 'XTickLabel', [-5 0 5 10]);
set(gca, 'YTickLabel', [0.5 1 1.5 2 2.5 3]);
%title('41x41 Grid')
ylabel('Time(s)')
xlabel('X(m)');
%xticks(x_tix);
colorbar;