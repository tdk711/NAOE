%% Rectangular Plate with Elliptical Hole
clc;
clear;

%% Dimesions:
a = 200; % Length (x)
b = 100; % Breadth (y)
a = a/2;
b = b/2;
major = 10; % Semi-Major Axis of Ellipse
minor = 5; % Semi-Minor Axis of Ellipse

%% Meshing:
h = 0.5*minor; % Mesh Element Size

domain = [-a,-b; a,b];
pfix = [-a,-b; -a,b; a,b; a,-b];

fu=@(p) ddiff(drectangle(p,-a, a, -b, b), dellipse(p,[major minor]));
[p,t] = distmesh2d(fu,@huniform,h,domain,pfix);
title('Mesh')
axis off;

%% Material Properties:
E = 2.1e5; % Young's Modulus 
v = 0.3; % Poisson's Ratio
thic = 1; % Thickness of Plate

%% Traction:
P = 10; % Units are Force/Area

%% Set Number of Nodes, Elements and DoFs:
n_nodes = numel(p)/2.0;
n_elements = numel(t)/3.0;
dof = 2;

%% Extract Right Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if(p(i,1)) > (0.999*(a))
            r_nodes(d) = i;
            d = d + 1;
        end
end

%% Extract Left Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if(p(i,1)) < (0.999*(-a))
            l_nodes(d) = i;
            d = d + 1;
        end
end

%% Set Surface Traction:
F = zeros(dof*n_nodes,1);

for i = 1:(numel(r_nodes)-1)
    L = abs(p(r_nodes(i+1),2) - p(r_nodes(i),2));
    F(2*r_nodes(i) - 1) = F(2*r_nodes(i) - 1) + (thic*L*P)/2;
    F(2*r_nodes(i+1) - 1) = F(2*r_nodes(i+1) - 1) + (thic*L*P)/2;
end

for i = 1:(numel(l_nodes)-1)
    L = abs(p(l_nodes(i+1),2) - p(l_nodes(i),2));
    F(2*l_nodes(i) - 1) = F(2*l_nodes(i) - 1) - (thic*L*P)/2;
    F(2*l_nodes(i+1) - 1) = F(2*l_nodes(i+1) - 1) - (thic*L*P)/2;
end
%% Stiffness Matrix:    
K = zeros(dof*n_nodes, dof*n_nodes);

for i = 1:n_elements  
    k = CST_k(p, t(i,:), E, v, thic); % Calculate Local Stiffness Matrix
    
% Assembly:
    for j = 1:6
        if mod(j,2) == 0
            a = 2*(t(i,ceil(j/2)));
        else
            a = 2*(t(i,ceil(j/2)))-1;
        end
        for  m = 1:6            
            if mod(m,2) == 0
                b = 2*(t(i,ceil(m/2)));
            else
                b = 2*(t(i,ceil(m/2))) - 1;
            end
            
            K(a, b) = K(a, b) + k(j, m);
        end
    end
end

%% Solving the Linear System:
U = linsolve(K,F);

%% Displacement at Nodes:
Ux = zeros(n_nodes,1);
Uy = zeros(n_nodes,1);

for i = 1:n_nodes
    Ux(i) = U(2*i-1);
    Uy(i) = U(2*i);
end

%% Element-Wise Displacements:
q = zeros(n_elements,6);

for i = 1:n_elements
    q(i,1) = U(2*t(i,1) - 1);
    q(i,2) = U(2*t(i,1));
    
    q(i,3) = U(2*t(i,2) - 1);
    q(i,4) = U(2*t(i,2));
    
    q(i,5) = U(2*t(i,3) - 1);
    q(i,6) = U(2*t(i,3));
end

%% Stress inside Element:
S = zeros(n_elements,3);
for i = 1:n_elements
    S(i,:) = stress(p, t(i,:), E, v, q(i,:));
end

%% Calculate Kt:
s_max = max(S(:,1));
Kt = s_max/P;
disp('Theoretical Stress Concentration Factor is:');
disp(1 + 2*(minor/major));
disp('Calculated Stress Concentration Factor is:');
disp(Kt);

%% Visualization
% Displacements:
figure
title('Displacements in the X-direction')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', Ux, 'FaceColor', 'interp'); colorbar;
title(colorbar, 'mm')

figure
title('Displacements in the Y-direction')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', Uy, 'FaceColor', 'interp'); colorbar;
title(colorbar, 'mm')

% Stresses:
figure
title('Sxx')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,1), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Nmm^{-2}')

figure
title('Syy')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,2), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Nmm^{-2}')

figure
title('Sxy')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,3), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Nmm^{-2}')
