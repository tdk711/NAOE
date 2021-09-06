%% Problem
% Heave and Pitch RAOs are calculated

%% Code
restoredefaultpath
savepath

hangle=180*pi/180; % Wave Heading Angle
load('offsetN.mat') % Loading Offset
load('x_loc') % Loading Station
load('MASS_PROPERTIES') % LOADING MASS PROPERTY
load('DIFFRACTION_FORCE') % LOADING HEAVE AND PITCH DIFFRACTION FORCES
load('ADDEDMASS') % LOADING HEAVE AND PITCH ADDEDMASS
load('DAMPING') % LOADING HEAVE AND PITCH DAMPING COEFFICIENTS
load('OMEGA') % LOADING WAVE FREQUENCY- VARIABLE NAME 'OMEGA'

Mass=MASS_PROPERTIES(1); % MASS OF THE SHIP
I5=MASS_PROPERTIES(2); % MASS MOMENT OF INERTIA OF THE SHIP FOR PITCH MOTION
lcg=MASS_PROPERTIES(3); % LCG OF THE SHIP WITH REFERENCE TO THE CO-ORDINATE SYSTEM
zcg=MASS_PROPERTIES(4); % VCG OF THE SHIP FROM THE MEAN WATER LEVEL WHERE THE CO-ORDINATE SYSTEM IS LOCATION

FD3=DIFFRACTION_FORCE(:,1); % HEAVE DIFFRACTION FORCE
FD5=DIFFRACTION_FORCE(:,2); % PITCH DIFFRACTION FORCE

A33=ADDEDMASS(:,1); % HEAVE ADDEDMASS
A35=ADDEDMASS(:,2); % HEAVE ADDEDMASS DUE TO PITCH MOTION
A53=ADDEDMASS(:,3); % PITCH ADDEDMASS DUE TO HEAEV MOTION
A55=ADDEDMASS(:,4); % PITCH ADDEDMASS DUE TO PITCH MOTION

B33=DAMPING(:,1); % HEAVE DAMPING COEFFICIENT
B35=DAMPING(:,2); % HEAVE DAMPING COEFFICIENT DUE TO PITCH MOTION
B53=DAMPING(:,3);% PITCH DAMPING DUE TO HEAEV MOTION
B55=DAMPING(:,4);% PITCH DAMPING DUE TO PITCH MOTION


lbp=175; % LBP
g=9.81;
density=1000; % DENSITY OF WATER

%% Calculate Sectional Areas
for p=1:length(x_loc)
    areas(p)=trapz(offsetN(2*p-1,:),offsetN(2*p,:));
    fmzarea(p) = trapz(offsetN(2*p-1,:),((offsetN(2*p,:).^2)/2))/areas(p);
end
 
%% Unit Normal Calculation

[row col]=size(offsetN);

      for p=1:length(x_loc)
                for l=1:col-1
                    y1=offsetN(2*p-1,l);
                    y2=offsetN(2*p-1,l+1);
                    z1=offsetN(2*p,l);
                    z2=offsetN(2*p,l+1);
                    Normaly(p,l)=(z1-z2)/sqrt((y2-y1)^2+(z2-z1)^2);
                    Normalz(p,l)=(y2-y1)/sqrt((y2-y1)^2+(z2-z1)^2);
                    midz(p,l)=(z1+z2)/2;
                    midy(p,l)=(y1+y2)/2;
                    dl(p,l)=sqrt((y2-y1)^2+(z2-z1)^2);
%                     Write your program for estimation of the unit normal  in y and z directions for each line segment in a station
                            
                end
                
      end
      
%% Volume and CoB
for h = 4:20
    if h == 4 || h == 20
        s(h) = areas(h);
    elseif h == 6:2:18
        s(h) = 2*areas(h);
    else
        s(h) = 4*areas(h);
    end
end
volume = trapz(x_loc,areas)%0.75*4.375*(areas(1)+3*areas(2)+3*areas(3)+areas(4)) + (8.75/3)*(sum(s))

% Write your program to calculate the volume and the longitudinal and verticcal centre of bouyancy of the ship
COBX= trapz(x_loc,x_loc.*areas)/trapz(x_loc,areas);
COBZ= trapz(x_loc,fmzarea.*areas)/trapz(x_loc,areas);

%% F-K Force
fk3=zeros(length(OMEGA),length(x_loc));
fk5=zeros(length(OMEGA),length(x_loc));

for n=1:length(OMEGA)
     for p=1:length(x_loc)
        
       
% k = (omega^2)/g
       fk3(n,p)= density*g*sum(Normalz(p,:).*(exp((OMEGA(1,n).^2)/g*midz(p,:)).*exp(-i*((OMEGA(1,n).^2)/g*x_loc(p)*cos(hangle)-sin(hangle)*((OMEGA(1,n).^2)/g*midy(p,:))))).*dl(p,:));  % sectional Froude-Krylov heave force
       fk5(n,p)= -x_loc(p)*fk3(n,p);% sectional Froude-Krylov pitch moment
       
     end   
 FK3(n,1)=trapz(x_loc,fk3(n,:)); % global F-K heave force. You can use the command trapz to calculate this force
 FK5(n,1)=trapz(x_loc,fk5(n,:));% global F-K pitch moment. You can use the command trapz to calculate this force
end


%% Total Exciting Force

F3=(FD3+FK3); % THIS SHOULD BE A nX1 MATRIX, where n is the number of frequencies
F5=(FD5+FK5); % THIS SHOULD BE A nX1 MATRIX


% STIFFNESS MATRICES 
for p = 1:length(x_loc)
    y(p) = offsetN(2*p-1,1);
end
areaw = 2*trapz(x_loc,y);
C33=density*g*areaw;% CALCULATE THE HEAVE-HEAVE RESTORING COEFFICIENT
C35=-density*g*2*trapz(x_loc,y.*x_loc);% CALCUALTE THE HEAVE-PITCH RESTORING COEFFICIENT
C53=C35;% CALCULATE THE PITCH-HEAVE RESTORING COEFFICIENT
C55=density*g*volume*2*trapz(x_loc,(y.*(x_loc).^2)/volume);% CALCCUALTHE PITCH-PITCH RESTORING COEFFICIENT

%for i = 1:10
    %a33 = A33(1);
    %a35 = A35(1);
    %a53 = A53(1);
    %a55 = A55(1);
 MASSMATRIX = [Mass -Mass*lcg;-Mass*lcg I5]% WRITE MASS MATRIX HERE . THIS WILL BE 2X2 MATRIX
%end
 STIFFNESS=[C33,C35;C53,C55]% WRITE STIFFNESS MATRIX. THIS WILL BE 2X2 MATRIX



%% Frequency Domain Solution
% SOLVE THE EQUATION OF MOTION HERE BASED ON FREQUENCY DOMAIN SOLUTION
for m=1:length(OMEGA)
    %A = -(MASSMATRIX(1,1)+A33(m))*OMEGA(m)^2+1i*OMEGA(m)*B33(m)+STIFFNESS(1,1);
    %B = -(MASSMATRIX(1,2)+A35(m))*OMEGA(m)^2+1i*OMEGA(m)*B35(m)+STIFFNESS(1,2);
    %C = -(MASSMATRIX(2,1)+A53(m))*OMEGA(m)^2+1i*OMEGA(m)*B53(m)+STIFFNESS(2,1);
    %D = -(MASSMATRIX(2,2)+A55(m))*OMEGA(m)^2+1i*OMEGA(m)*B55(m)+STIFFNESS(2,2);
    M = [A33(m),A35(m);A53(m),A55(m)]+MASSMATRIX;
    B = [B33(m),B35(m);B53(m),B55(m)];
    F = [F3(m);F5(m)];
    req = inv([-OMEGA(m)^2*M + 1i*OMEGA(m)*B + STIFFNESS])*F;
    z3(m)=req(1);%(D*abs(F3(m,1))-B*abs(F5(m,1)))/(A*D-B*C);
    z5(m)=req(2);%(C*abs(F3(m,1))-A*abs(F5(m,1)))/(B*C-A*D);
end
z3=z3% Heave RAO - THIS SHOULD HAVE VALUES FOR EACH FREQUENCY
z5=z5% PITCH RAO- THIS SHOULD HAVE VALUES FOR EACH FREQUENCY

wl=g*(2*pi./OMEGA).^2/2/pi/lbp;
k0=OMEGA.^2/g;
figure;subplot(2,1,1),plot(wl,abs(z3)),xlim([ 0. 2.5])
subplot(2,1,2),plot(wl,abs(z5)./k0.'),xlim([ 0. 2.5])