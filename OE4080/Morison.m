clc;
clear all;

% OE4080 Assignment-1: Morison's Equation:

%% Defining Global Variables:
global d; % Depth
global T; % Time Period
global g; % Acceleration due to Gravity
global H; % Wave Height
global theta; % Angle of Member with Vertical
global t_step; % Time Step for Loop
t_step = 0;
F_e = zeros(1,1401); 
F_w = zeros(1,1401); 

%% Input of Data:
d = input("Please enter water depth: ");
T = input("Please enter Time Period: ");
H = input("Please enter Wave Height: ");
D = input("Please Enter Diameter: ");
theta = input("Please Enter Angle with Vertical: ");

Cd = 0.7;
Cm = 2;
g = 9.81;
rho = 1025;

%% Wave and Member Properties:
% Wavelength
 fun = @f; 
 x0 = [1 300]; 
 L = fzero(fun,x0);

% K and Omega
global k;
k = (2*pi)/L;
global omega;
omega = (2*pi)/T;

% Member Unit Vector:
cx = sin(theta);
cz = cos(theta);

%% Force Calculation by Extrapolation:

while t_step <= 14

    % Limit of Z
    fun2 = @wf; 
    z0 = [-100 100]; 
    z_max = fzero(fun2,z0);
   
     %Kinematics:
      u = @(x,z,t)((pi.*H)/T).*((cosh(k.*(d-z)))./sinh(k.*d)).*cos((k.*x) - (omega.*t));
      w = @(x,z,t) ((pi.*H)/T).*((sinh(k.*(d-z)))./(sinh(k.*d))).*sin(k.*x - omega.*t);
      u_dot = @(x,z,t) ((2.*H).*((pi./T).^2)).*((cosh(k.*(d-z)))./(sinh(k.*d))).*sin(k.*x - omega.*t);
      w_dot = @(x,z,t) -((2.*H).*((pi./T).^2)).*((sinh(k.*(d-z)))./(sinh(k.*d))).*cos(k.*x - omega.*t);
      
    % Forces
    f_D_x = @(z) ((1-(cx.^2)).*u((d+z).*tan(theta),z,t_step)-(cx.*cz).*(w((d+z).*tan(theta),z,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z,t_step); w((d+z).*tan(theta),z,t_step)]));
    f_D_x_e = @(z) ((1-(cx.^2)).*u((d+z).*tan(theta),0,t_step)-(cx.*cz).*(w((d+z).*tan(theta),0,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),0,t_step); w((d+z).*tan(theta),0,t_step)]));

    f_D_z = @(z) ((1-(cz.^2)).*w((d+z).*tan(theta),z,t_step)-(cx.*cz).*(u((d+z).*tan(theta),z,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z,t_step); w((d+z).*tan(theta),z,t_step)]));
    f_D_z_e = @(z) ((1-(cz.^2)).*w((d+z).*tan(theta),0,t_step)-(cx.*cz).*(u((d+z).*tan(theta),0,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),0,t_step); w((d+z).*tan(theta),0,t_step)]));
    
    f_I_x = @(z) ((1-(cx.^2)).*u_dot((d+z).*tan(theta),z,t_step)-(cx.*cz).*(w_dot((d+z).*tan(theta),z,t_step)));
    f_I_x_e = @(z) ((1-(cx.^2)).*u_dot((d+z).*tan(theta),0,t_step)-(cx.*cz).*(w_dot((d+z).*tan(theta),0,t_step))); 
    
    f_I_z = @(z) ((1-(cz.^2)).*w_dot((d+z).*tan(theta),z,t_step)-(cx.*cz).*(u_dot((d+z).*tan(theta),z,t_step)));
    f_I_z_e = @(z) ((1-(cz.^2)).*w_dot((d+z).*tan(theta),0,t_step)-(cx.*cz).*(u_dot((d+z).*tan(theta),0,t_step))); 
    
    
    if z_max <= 0
        F_D_x = integral(f_D_x,-d,z_max);
        F_D_z = integral(f_D_z,-d,z_max);
        F_I_x = integral(f_I_x,-d,z_max);
        F_I_z = integral(f_I_z,-d,z_max);
        
    else
        F_D_x = integral(f_D_x,-d,0)+integral(f_D_x_e,0,z_max);
        F_D_z = integral(f_D_z,-d,0)+integral(f_D_z_e,0,z_max);
        F_I_x = integral(f_I_x,-d,0)+integral(f_I_x_e,0,z_max);
        F_I_z = integral(f_I_z,-d,0)+integral(f_I_z_e,0,z_max);
    end

    F_X_e = ((0.5)*(rho)*(Cd*D))*F_D_x + (Cm*rho*(D^2)*(pi/4))*F_I_x;
    F_Z_e = (Cm*rho*(D^2)*(pi/4))*F_I_z + ((0.5)*(rho)*(Cd*D))*F_D_z;
    
     if(dot([F_X_e F_Z_e],[cos(theta) -sin(theta)])) < 0
         F_e(int16((t_step*100))+1) = -norm([F_X_e  F_Z_e]);
     else
         F_e(int16((t_step*100))+1) = norm([F_X_e  F_Z_e]);
     end
     
    t_step = t_step + 0.01;
end

%% Force Calculation by Wheeler's
t_step = 0;
while t_step <= 14

    % Limit of Z
    fun2 = @wf;
    z0 = [-100 100]; 
    z_max = fzero(fun2,z0);
    
    z_dash = @(z) (z-((H./2).*cos(k.*(z+d).*tan(theta) - omega.*t_step))).*(d./(d+((H./2).*cos(k.*(z+d).*tan(theta) - omega.*t_step))));
   
     %Kinematics:
      u = @(x,z,t)((pi.*H)/T).*((cosh(k.*(d-z)))./sinh(k.*d)).*cos((k.*x) - (omega.*t));
      w = @(x,z,t) ((pi.*H)/T).*((sinh(k.*(d-z)))./(sinh(k.*d))).*sin(k.*x - omega.*t);
      u_dot = @(x,z,t) ((2.*H).*((pi./T).^2)).*((cosh(k.*(d-z)))./(sinh(k.*d))).*sin(k.*x - omega.*t);
      w_dot = @(x,z,t) -((2.*H).*((pi./T).^2)).*((sinh(k.*(d-z)))./(sinh(k.*d))).*cos(k.*x - omega.*t);
      
    % Forces
    %f_D_x = @(z) ((1-(cx.^2)).*u((d+z).*tan(theta),z,t_step)-(cx.*cz).*(w((d+z).*tan(theta),z,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z,t_step); w((d+z).*tan(theta),z,t_step)]));
    f_D_x_w = @(z) ((1-(cx.^2)).*u((d+z).*tan(theta),z_dash(z),t_step)-(cx.*cz).*(w((d+z).*tan(theta),z_dash(z),t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z_dash(z),t_step); w((d+z).*tan(theta),z_dash(z),t_step)]));

    %f_D_z = @(z) ((1-(cz.^2)).*w((d+z).*tan(theta),z,t_step)-(cx.*cz).*(u((d+z).*tan(theta),z,t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z,t_step); w((d+z).*tan(theta),z,t_step)]));
    f_D_z_w = @(z) ((1-(cz.^2)).*w((d+z).*tan(theta),z_dash(z),t_step)-(cx.*cz).*(u((d+z).*tan(theta),z_dash(z),t_step))).*(norm([1-(cx.^2) -cx.*cz; -cx.*cz 1-(cz.^2);]*[u((d+z).*tan(theta),z_dash(z),t_step); w((d+z).*tan(theta),z_dash(z),t_step)]));
    
    %f_I_x = @(z) ((1-(cx.^2)).*u_dot((d+z).*tan(theta),z,t_step)-(cx.*cz).*(w_dot((d+z).*tan(theta),z,t_step)));
    f_I_x_w = @(z) ((1-(cx.^2)).*u_dot((d+z).*tan(theta),z_dash(z),t_step)-(cx.*cz).*(w_dot((d+z).*tan(theta),z_dash(z),t_step))); 
    
    %f_I_z = @(z) ((1-(cz.^2)).*w_dot((d+z).*tan(theta),z,t_step)-(cx.*cz).*(u_dot((d+z).*tan(theta),z,t_step)));
    f_I_z_w = @(z) ((1-(cz.^2)).*w_dot((d+z).*tan(theta),z_dash(z),t_step)-(cx.*cz).*(u_dot((d+z).*tan(theta),z_dash(z),t_step))); 
    
    
%     if z_max <= 0
        F_D_x = integral(f_D_x_w,-d,z_max);
        F_D_z = integral(f_D_z_w,-d,z_max);
        F_I_x = integral(f_I_x_w,-d,z_max);
        F_I_z = integral(f_I_z_w,-d,z_max);
        


    F_X_w = ((0.5)*(rho)*(Cd*D))*F_D_x + (Cm*rho*(D^2)*(pi/4))*F_I_x;
    F_Z_w = (Cm*rho*(D^2)*(pi/4))*F_I_z + ((0.5)*(rho)*(Cd*D))*F_D_z;
    
     if(dot([F_X_w F_Z_w],[cos(theta) -sin(theta)])) < 0
         F_w(int16((t_step*100))+1) = -norm([F_X_w  F_Z_w]);
     else
         F_w(int16((t_step*100))+1) = norm([F_X_w  F_Z_w]);
     end
     
    t_step = t_step + 0.01;
end

%% Graphing:
% Comparison Graph:
figure
t_axis = linspace(0,14,1401);
plot(t_axis,F_e);

hold on 
plot(t_axis,F_w);
hold off
 
xlabel('Time(s)');
ylabel('Force(N)');
title('Comparison of Wheelers and Extrapolation Method');
 
%% Functions
% Dispersion Relation:
function lambda = f(L)
    global d;
    global T;
    global g;
 
    lambda = (L) - ((g*(T^2))/(2*pi))*tanh(((2*pi)*d)/L);
end

% Wave Function:
function z_ins = wf(z)
    global H;
    global k;
    global omega;
    global t_step;
    global theta;
    global d;
 
    z_ins = (z) - (H/2)*cos(k*(z+d)*tan(theta) - omega*t_step);
end


