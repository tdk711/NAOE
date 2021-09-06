%% Problem
% In this problem we will write a function turning_circle() that expressed the Davidson and Schiff model as a 
% first order ODE. We will use the non-dimensional form of the equation for this problem. 
% Here we will make a distinction between commanded rudder angle  and actual rudder angle . 
% In the class we assumed that any arbitrary rudder angle can instantly be achieved (such as the rudder 
% angle changing from  to  instantaneously). However, physically such behavior is not possible. Here we will
% assume that the rudder angle is governed by a first order scalar differential equation  where the derivative is with 
% respect to non-dimensional time  defined in the lectures.
% Thus the state vector for our problem is  and is given by . Express the equations of motion in the state space form.

%% Code to Call function
clc;

set(0,'DefaultLineLineWidth',1.5)
set(0,'DefaultAxesFontName','Times New Roman')
set(0,'DefaultAxesFontSize',14)

dt = 0.1;
Tmax = 40;

params = struct;

params.delta_c = -10*pi/180;

params.m  = 888 * 1e-5;
params.Iz = 65 * 1e-5;
params.xG = -0.023;

% Hydrodynamic derivatives representing added mass

params.Yvd = -912 * 1e-5;
params.Yrd = 0 * 1e-5;
params.Nvd = 0 * 1e-5;
params.Nrd = -50 * 1e-5;

% Other Hydrodynamic derivatives

params.Yv = -1430 * 1e-5;
params.Yr =  456 * 1e-5;
params.Nv = -460 * 1e-5;
params.Nr = -296 * 1e-5;

% Rudder hydrodynamic derivatives

params.Yd = 278 * 1e-5;
params.Nd = -139 * 1e-5;

ini_cond = zeros(6,1);

sol = ode45(@(t,x) turning_circle(t,x,params),[0 Tmax],ini_cond);

t = 0:dt:Tmax;

v = deval(sol,t,1);
u = sqrt(1 - v.^2);
r = deval(sol,t,2);
x0 = deval(sol,t,3);
y0 = deval(sol,t,4);
psi = deval(sol,t,5);
delta = deval(sol,t,6);

figure(1)
plot(x0,y0,'k--')
set(gca,'Ydir','reverse')
axis equal
hold all

ship = [-0.50 0.25 0.50 0.25 -0.50 -0.50;
         0.080 0.080 0.00 -0.08 -0.08 0.08];

for i = 1:ceil(numel(t)/5):numel(t)
    new_ship = [cos(psi(i)) -sin(psi(i)); sin(psi(i)) cos(psi(i));]*ship + [x0(i); y0(i);];    
    plot(new_ship(1,:),new_ship(2,:),'r')    
end
title('Turning Circle Maneuver')
xlabel('x_0/L')
ylabel('y_0/L')
box off

figure(2)
subplot(3,1,1)
plot(t,u)
ylabel('u''(t'')')
box off
subplot(3,1,2)
plot(t,v)
ylabel('v''(t'')')
box off
subplot(3,1,3)
plot(t,r)
ylabel('r''(t'')')
box off
xlabel('Time t''')
subtitle('Surge, Sway and Yaw velocities')

figure(3)
plot(t,delta*180/pi)
title('Actual Rudder Angle')
xlabel('Time t''')
ylabel('\delta(t'')')
box off



%% Function

function xd = turning_circle(t,var,params)
%--------------------------------------------------------------------------
% The state vector var is a 6 x 1 vector with states:
%
% v     : Nondimensional Sway Velocity
% r     : Nondimensional Turn Rate
% x0    : Nondimensional x-position in GCS
% y0    : Nondimensional y-position in GCS
% psi   : Heading angle in rad
% delta : Actual Rudder Angle in rad
%--------------------------------------------------------------------------

v = var(1);
r = var(2);
psi = var(5);
delta = var(6);

u = sqrt(1 - v.^2);

% Commanded Rudder Angle in Turning Circle Maneuver
delta_c = params.delta_c;

% Mass and Hydrodynamic Parameter in non-dimensional form

m = params.m;
Iz = params.Iz;
xG = params.xG;

Yvd = params.Yvd;
Yrd = params.Yrd;
Nvd = params.Nvd;
Nrd = params.Nrd;

Yv = params.Yv;
Yr = params.Yr;
Nv = params.Nv;
Nr = params.Nr;

Yd = params.Yd;
Nd = params.Nd;

%--------------------------------------------------------------------------
a1 = (m - Yvd);
a2 = (Yrd - m*xG);
a3 = (Yv);
a4 = (Yr - m);
a5 = (Yd);

b1 = (Iz - Nrd);
b2 = (Nvd - m*xG);
b3 = (Nv);
b4 = (Nr - m*xG);
b5 = (Nd);

delta_dot = delta_c - delta;

v_dot = ((b3 + ((b1*a3)/a2))*v + r*(b4 + ((b1*a4)/a2)) + delta*(b5 + ((b1*a5)/a2)))/(((b1*a1)/a2) - b2);

r_dot = ((b3 + ((b2*a3)/a1))*v + r*(b4 + ((b2*a4)/a1)) + delta*(b5 + ((b2*a5)/a1)))/(b1 - ((b2*a2)/a1));

psi_dot = r;

x0_dot = u*cos(psi) - v*sin(psi);
y0_dot = u*sin(psi) + v*cos(psi);

xd = zeros(6,1);  % Initialization
xd = [v_dot; r_dot; x0_dot; y0_dot; psi_dot; delta_dot;] ;
end