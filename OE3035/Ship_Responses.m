%% Problem
% PM Spectrum is generated and the heave and pitch responses of a Container ship are calculated

%% Code
restoredefaultpath
savepath

load z3.mat
load z5.mat
load OMEGA


v = 0.15*sqrt(9.81*175);                                              
Hs = 3;                                                               
Tp = 12;                                                              
wp = (2*pi)/Tp;                                                       

dw=2*pi/1000;                                                         
w=0.15:dw:1;                                                          


for i = 1:numel(w)
    Sw(i) = (5/16)*(Hs^2)*(wp^4)*(w(i)^-5)*exp((-5/4)*((w(i)/wp)^-4));        % Calcualte Sw
    we(i) = w(i) - ((w(i)^2)/9.81)*v*cos(pi);                                 % Calcualte we
    Swe(i) = Sw(i)/(1-(2*(w(i)/9.81)*v*cos(pi)));                             % Calcualte Swe    
end

figure
plot(we,Swe,'-r',w,Sw,'-b')

m0 = trapz(we,Swe);
m2 = trapz(we,(we.^2).*Swe);

Hs_wave = 4*sqrt(m0);                                                              
Tz_wave = 2*pi*sqrt(m0/m2);                                                         

z3i =  interp1(OMEGA,abs(z3), we);                                                              
z5i =  interp1(OMEGA,abs(z5), we);                                                          

for i = 1:numel(w)
    Sheave(i) = (z3i(i).^2).*Swe(i);                                                            
    Spitch(i) = (z5i(i).^2).*Swe(i);                                                                                                            
end                                                          

m0h = trapz(we,Sheave);
m2h = trapz(we,(we.^2).*Sheave);

Hs_heave = 4*sqrt(m0h);                                                       
Tz_heave = 2*pi*sqrt(m0h/m2h);                                                  

m0p = trapz(we,Spitch);
m2p = trapz(we,(we.^2).*Spitch);

Hs_pitch = 4*sqrt(m0p);                                                        
Tz_pitch = 2*pi*sqrt(m0p/m2p);                                                 

figure;
subplot(2,1,1),plot(we,Sheave)
subplot(2,1,2),plot(we,Spitch)
