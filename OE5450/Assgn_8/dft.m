clc;
clear;

N = 300;
L = 10;
f = zeros(N-1,N-1);
d = L/(N-1);
                     
%% Boundary Conditions:
% Sources and Sinks:
f((N)/2+1, ((N))/5 + 1) =  1.00;
f((N)/2+1, (4*(N))/5 + 1) = 1.00;

%% Solution:

F = dst2(f);
U = zeros(N-1,N-1);

for a = 1:N-1
    for b = 1:N-1
        U(a,b) = (0.25*F(a,b))/(1 - (cos((pi*(a+b))/(2*(N))))*(cos((pi*(a-b))/(2*(N)))));    
    end
end

s = idst2(U);
u = zeros(N+1,N+1);
u(2:N,2:N) = s;

figure
imagesc(u);
colorbar;
axis off;

figure
contour(u);
