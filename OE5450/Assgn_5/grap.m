clc;
clear;

T = readmatrix('output_1.txt');
%C = readmatrix('output_4.txt');
x = 0:1:200;
plot(x,T(1,:), x,T(100,:), x,T(200,:), x,T(300,:));
%hold on;
%plot(x,C(1,:), x,C(250,:), x,C(500,:), x,C(1000,:));
legend('t=0s', 't=1s', 't=2s', 't=3s');
set(gca, 'XTickLabel', [-10 -5 0 5 10]);
%set(gca, 'YTickLabel', [0.5 1 1.5 2 2.5 3]);
ylabel('Concentration')
xlabel('X(m)');
