%% Circular Plate with Elliptical Hole
clc;
clear;

%% Dimesions:
r = 50; % Radius
major = 10; % Semi-Major Axis
minor = 5; % Semi-Minor Axis

%% Meshing:
h = 0.2*major; % Mesh Element Size

domain = [-r,-r; r,r];
pfix = [-r, 0 ; 0,r; r,0;0,-r];
fu=@(p) ddiff(dcircle(p,0,0,r), p(:,1).^2/(major)^2+p(:,2).^2/(minor)^2-1);
[p,t] = distmesh2d(fu,@huniform,h,domain,pfix);
title('Mesh')
axis off;

%% Material Properties:
E = 2.1e5; % Young's Modulus
v = 0.3; % Poisson's Ratio
thic = 1; % Thickness of Plate

%% Surface Traction:
P = 10; % Units are Force/Area

%% Set Number of Nodes, Elements and DoFs:
n_nodes = numel(p)/2.0;
n_elements = numel(t)/3.0;
dof = 2;

%% Extract Circular Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if( norm([p(i,1) p(i,2)])) > (0.999*(r))
            if(p(i,1) >=0 && p(i,2) >=0)
                    a_nodes(d) = i;
                    d = d + 1;
            end
        end
end

d = 1;
for i = 1:n_nodes
        if( norm([p(i,1) p(i,2)])) > (0.999*(r))
            if(p(i,1) >=0 && p(i,2) < 0)
                    b_nodes(d) = i;
                    d = d + 1;
            end
        end
end
b_nodes = flip(b_nodes);

d = 1;
for i = 1:n_nodes
        if( norm([p(i,1) p(i,2)])) > (0.999*(r))
            if(p(i,1) <0 && p(i,2) < 0)
                    c_nodes(d) = i;
                    d = d + 1;
            end
        end
end
c_nodes = flip(c_nodes);

d = 1;
for i = 1:n_nodes
        if( norm([p(i,1) p(i,2)])) > (0.999*(r))
            if(p(i,1) <0 && p(i,2) >= 0)
                    d_nodes(d) = i;
                    d = d + 1;
            end
        end
end

c_nodes = [a_nodes b_nodes c_nodes d_nodes];

%% Set Surface Traction:
F = zeros(dof*n_nodes,1);

for i = 1:(numel(c_nodes))
    
     if (i == numel(c_nodes))
        L = norm([(p(c_nodes(1),1) - p(c_nodes(i),1))  (p(c_nodes(1),2) - p(c_nodes(i),2))]);
        
        F(2*c_nodes(i) - 1) = F(2*c_nodes(i) - 1) + ((thic*L*P)/2)*(p(c_nodes(i),1)/r);
        F(2*c_nodes(i)) = F(2*c_nodes(i)) + ((thic*L*P)/2)*(p(c_nodes(i),2)/r);
    
        F(2*c_nodes(1) - 1) = F(2*c_nodes(1) - 1) + ((thic*L*P)/2)*(p(c_nodes(1),1)/r);
        F(2*c_nodes(1)) = F(2*c_nodes(1)) + ((thic*L*P)/2)*(p(c_nodes(1),2)/r);
    else
        L = norm([(p(c_nodes(i+1),1) - p(c_nodes(i),1))  (p(c_nodes(i+1),2) - p(c_nodes(i),2))]);


        F(2*c_nodes(i) - 1) = F(2*c_nodes(i) - 1) + ((thic*L*P)/2)*(p(c_nodes(i),1)/r);
        F(2*c_nodes(i)) = F(2*c_nodes(i)) + ((thic*L*P)/2)*(p(c_nodes(i),2)/r);

        F(2*c_nodes(i+1) - 1) = F(2*c_nodes(i+1) - 1) + ((thic*L*P)/2)*(p(c_nodes(i+1),1)/r);
        F(2*c_nodes(i+1)) = F(2*c_nodes(i+1)) + ((thic*L*P)/2)*(p(c_nodes(i+1),2)/r);
    end    
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

%% Solving the System of Linear Equations:
K = sparse(K);
F = sparse(F);
U = K\F;

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
disp('Stress Concentration Factor is:');
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