clc;
clear;

%% Dimesions:
r = 40;
major = 0.5*r;
minor = 0.25*r;
h = (0.05*r);

domain = [0,0; r,r];
pfix = [0,minor; 0,r; r,0; major,0];

% Load:
Z = 1000;

%% Meshing:
fu=@(p) ddiff(dintersect(drectangle(p,0,r,0,r),dcircle(p,0,0,r)), p(:,1).^2/(major)^2+p(:,2).^2/(minor)^2-1);
%fh=@(p) 0.05+0.3*(p(:,1).^2/(major)^2+p(:,2).^2/(minor)^2-1);
[p,t] = distmesh2d(fu,@huniform,h,domain,pfix);
title('Mesh')

%% Material Properties:
E = 2e6;
v = 0.1;
thic = 0.1;

%% Set Number of Nodes, Elements and Dofs:
n_nodes = numel(p)/2.0;
n_elements = numel(t)/3.0;
dof = 2;

%% Extract Circular Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if(norm([p(i,1) p(i,2)])*(0.025) > 0.99)
            c_nodes(d) = i;
            d = d + 1;
        end
end

%% Extract Left Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if(abs(p(i,1)) < 1e-4)
            l_nodes(d) = i;
            d = d + 1;
        end
end

%% Extract Bottom Boundary Nodes:
d = 1;
for i = 1:n_nodes
        if(abs(p(i,2)) < 1e-4)
            b_nodes(d) = i;
            d = d + 1;
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

%% Displacement Boundary Conditions:
Restricted_dofs = zeros(1,numel(l_nodes) + numel(b_nodes));

for i = 1:numel(l_nodes)
    Restricted_dofs(i) = 2*l_nodes(i) - 1;
end

for i = 1:numel(b_nodes)
    Restricted_dofs(i+numel(l_nodes)) = 2*b_nodes(i);
end

%% Load Vector:
F = zeros(n_nodes*dof,1);
for i = 1:numel(c_nodes)
    F(2*(c_nodes(i)) - 1) = Z*((p(c_nodes(i),1))/norm([p(c_nodes(i),1) p(c_nodes(i),2)]));
    F(2*(c_nodes(i))) = Z*((p(c_nodes(i),2))/norm([p(c_nodes(i),1) p(c_nodes(i),2)]));
end

%% Matrix Solver:
for i = Restricted_dofs
    K(i,:) = 0;
    K(:,i) = 0;
    K(i,i) = 1;    
end
K = sparse(K);
U = inv(K)*F;

%% Deformed Mesh:
pd = zeros(5,2);
for i = 1:n_nodes
    pd(i,1) = p(i,1) + 10*U(2*i - 1);
    pd(i,2) = p(i,2) + 10*U(2*i);
end


%% Displacement Fields:
Ux = zeros(n_nodes,1);
Uy = zeros(n_nodes,1);
for i = 1:n_nodes
    Ux(i) = U(2*i-1);
    Uy(i) = U(2*i);
end


%% Element-Wise Displacements:
q = zeros(n_elements,6);

for i = 1:n_elements
    q(i,1) = U(2*t(i,1)-1);
    q(i,2) = U(2*t(i,1));
    
    q(i,3) = U(2*t(i,2)-1);
    q(i,4) = U(2*t(i,2));
    
    q(i,5) = U(2*t(i,3)-1);
    q(i,6) = U(2*t(i,3));
end

%% Stress inside Element:
S = zeros(n_elements,3);
for i = 1:n_elements
    S(i,:) = stress(p, t(i,:), E, v, q(i,:));
end

%% Visualization
% Deformed Mesh:
figure
title('Original vs. Deformed Mesh')
xlabel('X(cm)')
ylabel('Y(cm)')
for i=1:n_elements   
    nd = t(i,:);
    X = [p(nd(1),1) p(nd(2),1) p(nd(3),1)];
    Y = [p(nd(1),2) p(nd(2),2) p(nd(3),2)];
    line(X,Y, 'Color','b');
    hold on;
    line([X(3) X(1)],[Y(3) Y(1)], 'Color', 'b');
    hold on;
end
hold on;
for i=1:n_elements   
    nd = t(i,:);
    X = [pd(nd(1),1) pd(nd(2),1) pd(nd(3),1)];
    Y = [pd(nd(1),2) pd(nd(2),2) pd(nd(3),2)];
    line(X,Y, 'Color','r');
    hold on;
    line([X(3) X(1)],[Y(3) Y(1)], 'Color', 'r');
    hold on;
end
hold off;

% Displacements:
figure
title('Displacements in the X-direction)')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', 10.*Ux, 'FaceColor', 'interp'); colorbar;
title(colorbar, 'mm')

figure
title('Displacements in the Y-direction)')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', 10.*Uy, 'FaceColor', 'interp'); colorbar;
title(colorbar, 'mm')

% Stresses:
figure
title('Sxx')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,1), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Ncm^{-2}')

figure
title('Syy')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,2), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Ncm^{-2}')

figure
title('Sxy')
patch('Faces',t,'Vertices',p, 'FaceVertexCData', S(:,3), 'FaceColor', 'flat'); colorbar;
title(colorbar, 'Ncm^{-2}')
