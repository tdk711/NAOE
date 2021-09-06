%% Problem
% In a PMM test, the vessel is connected to the carriage of a towing tank through two transverse rods that can induce 
% transverse motion while the carriage is moving forward with speed .
% Let the two points on the model where the connections are made to the carriage be both  distance away from midship.
% One point is aft of midship and the other is forward of midship. 
% Let the motion induced at the forward connection be  and the motion at the aft connection be .
% In this problem we will adjust the phase difference  between the two oscillators connected to the vessel such that we
% achieve a pure yaw scenario. You may assume for this problem that the heading angle is small .
% Try running the code with  that corresponds to pure sway and see what you observe from the plots.

%% Code 

set(0,'DefaultLineLineWidth',1.5)
set(0,'DefaultAxesFontName','Times New Roman')
set(0,'DefaultAxesFontSize',14)

t = 0:0.01:100;

w = 2*pi/10;
d = 100;
U = 12.5;
a = 5;

% Write down the expression for phase difference
k = ((w*d)/(2*U));
e = 2*atan(k);

yf = a*cos(w*t);
ya = a*cos(w*t - e);

y = (ya + yf)/2;
x = U*t;

% Write down the expression for yaw angle ( use atan2 function for inverse tangent)
y_ = yf - ya;
psi = atan2(y_,d);


ship = [-0.50 0.25 0.50 0.25 -0.50 -0.50;
         0.080 0.080 0.00 -0.08 -0.08 0.08];

for j = 1:3
    figure(j)
    plot(x,y)
    axis equal
    hold all
    i = randi(numel(t));
    new_ship = [cos(psi(i)) -sin(psi(i)); sin(psi(i)) cos(psi(i));]*ship + [x(i); y(i);];    
    plot(new_ship(1,:),new_ship(2,:),'r')
    xlim([x(i)-2 x(i)+2])
    title('Orientation of Ship Relative to Path')
    xlabel('x in m')
    ylabel('y in m')
end