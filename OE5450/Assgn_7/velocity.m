clc;
clear;

V = readmatrix('v.txt');
U = readmatrix('u.txt');

vel = zeros(101,101);
for i = 1:101
    for j = 1:101
        vel(i,j) = norm([U(i,j) V(i,j)]);
    end
end

imagesc(vel)
title("Velocity")
colorbar
%set(gca, 'YTickLabel', 0.9:-0.1:0)
%set(gca, 'XTickLabel', 0.1:0.1:1)
