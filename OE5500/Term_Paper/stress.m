function S = stress(p, e, E, v, Q)
    A = (0.5)*det([p(e(1),:) 1; p(e(2),:) 1; p(e(3),:) 1;]); % Area
    
    D = (E/(1-(v^2)))*[1 v 0; v 1 0; 0 0 (0.5)*(1-v);]; % Constitutive Matrix
    
    b1 = -p(e(3),2) + p(e(2),2); 
    c1 = p(e(3),1) - p(e(2),1);
    b2 = p(e(3),2) - p(e(1),2);
    
    c2 = -p(e(3),1) + p(e(1),1);
    
    b3 = -p(e(2),2) + p(e(1),2);
    c3 = p(e(2),1) - p(e(1),1);
    
    B = (1/(2*A))*[b1 0 b2 0 b3 0; 0 c1 0 c2 0 c3; c1 b1 c2 b2 c3 b3;];
    
    epsilon = B*(Q');
    S = D*epsilon;
    
    
    S = S';
   
end

