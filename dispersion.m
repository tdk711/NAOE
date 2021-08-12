

% OE4080 Assignment-1: Dispersion Relation:

% Defining Global Variables:
global d_; % Depth
global T_; % Time Period
global g_; % Acceleration due to Gravity

% Inputs:
d_ = input('Enter Depth: ');
T_ = input('Enter Time Period: ');
g_ = 9.81;


% Solving for Wavelength:
fun = @f; 
x0 = [1 100]; 
l = fzero(fun,x0);

fprintf('Wavelength is: %f metres\n', l);

% Dispersion Relation defined as a Function:
function z = f(L)
    global d_;
    global T_;
    global g_;
    
    d = d_;
    T = T_;
    g = g_;

    z = (L) - ((g*(T^2))/(2*pi))*tanh(((2*pi)*d)/L);
end

