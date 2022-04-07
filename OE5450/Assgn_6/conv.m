clc;
clear;

z = readmatrix('output_z.txt');
p = readmatrix('output_p.txt');

i = 1:1:numel(z);

loglog(i,z)
hold on;
loglog(i,p)
legend('Zeta','Psi')
