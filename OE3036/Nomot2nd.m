%% Problem:
% In this problem we will write a function nomoto2() that expresses the Nomoto 2nd order model subjected to PD control as a
% first order vector ODE. We will use the non-dimensional form of the equation. 
% The primary difference between this assignment and the material discussed in our class is that here we will make a
% distinction between commanded rudder angle  and actual rudder angle . In the class we assumed that any arbitrary
% rudder angle can instantly be achieved (such as the rudder angle changing from  to  instantaneously).
% However, physically such behavior is not possible. Here we will assume that the rudder angle is governed by a first 
% order scalar differential equation  where the derivative is with respect to non-dimensional time  defined in the lectures.
% We will apply our PD control law to the commanded rudder angle  with non-dimensional proportional control gain  and
% non-dimensional derivative control gain.
% Thus the state vector for our problem is  and is given by . Express the equations of motion in the state space form.

%% Code to Call Function

T1 = 3;
T2 = 0.5;
T3 = 1;
K = -1.5;
Kp = -0.1;
Kd = -0.25;
psid = 10*pi/180;
Tmax = 30;

sol = ode45(@(t,x) nomoto2(t,x,T1,T2,T3,K,psid,Kp,Kd), [0 Tmax], [0; 0; 0; 0;]);

t = 0:0.01:Tmax;
psi = deval(sol,t,1);
rp = deval(sol,t,2);
delta = deval(sol,t,3);

figure(1)
plot(t,psi*180/pi)
title('Heading Angle')
xlabel('t''')
ylabel('\psi in degrees')

figure(2)
plot(t,rp)
title('Non-dimensional turn rate')
xlabel('t''')
ylabel('r')

figure(3)
plot(t,delta*180/pi)
title('Rudder Angle')
xlabel('t''')
ylabel('\delta in degrees')

%% Function

function xd = nomoto2(t,x,T1,T2,T3,K,psid,Kp,Kd)
%--------------------------------------------------------------------------
% Second order Nomoto model with PD control. The state vector is 4 x 1 and
% its elements are given by the following in the same order:
%
% psi   : The heading angle in rad
% rp    : Non-dimensional turn rate
% rpd   : Derivative of non-dimensional turn rate w.r.t. non-dimensional time 
% delta : Actual rudder angle in rad
%
% The additional inputs to the function include the Nomoto parmaters T1, 
% T2, T3 and K in the non-dimensional form, desired heading angle psid and 
% controller gains Kp and Kd.
%
% You are required to express the system as a vector first order ODE
%--------------------------------------------------------------------------

psi = x(1);
rp = x(2);
rpd = x(3);
delta = x(4);


xd = zeros(4,1); % Initialization

delta_c = Kp*(psid - psi) - Kd*rp;
delta_dot = delta_c - delta;


rpd_dot = (K*(delta + T3*delta_dot) - (rp + ((T1+T2)*rpd)))/(T1*T2);

psi_dot = rp;

xd = [psi_dot; rpd; rpd_dot; delta_dot;];

end

