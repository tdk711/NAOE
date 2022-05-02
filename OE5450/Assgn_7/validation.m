clc;
clear;

v = readmatrix('u.txt');
v = v(:,65);

x = [1.00 0.9766 0.9688 0.9609 0.9531 0.8516 0.7344 0.6172 0.5000 0.4531 0.2813 0.1719 0.1016 0.0703 0.0625 0.0547 0.0000];
m = [v(1) v(8) v(9) v(10) v(14) v(23) v(37) v(59) v(65) v(80) v(95) v(110) v(123) v(124) v(125) v(126) v(129)];
s = [1.00 0.84123 0.78871 0.73722 0.68717 0.23151 0.00332 -0.13641 -0.20581 -0.21090 -0.15662 -0.10150 -0.06434 -0.04775 -0.04192 -0.03717 0.00];

x = flip(x);
plot(x,m,'-o')
xlabel('x')
ylabel('v')
hold on;
plot(x, s,'-s');
legend('Calculated','Ghia et. al');
