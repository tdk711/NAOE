#include <iostream>
#include <bits/stdc++.h>

using namespace std;

float area(float, float);

int main(){

    // Declare Variables
    float b, h, b1, b2, r1, r2, a1, a2, total;

    // Initialise Variables
    b = 0.0;
    h = 0.0;
    b1 = 0.0;
    b2 = 0.0;
    r1 = 0.0;
    r2 = 0.0;
    a1 = 0.0;
    a2 = 0.0;
    total = 0.0;

    // Take Inputs
    cout<<"Please enter base length and height: ";
    cin>> b >> h;

    cout<<"Enter ratio of division of base r1:r2 ";
    cin>> r1 >> r2;

    // Calculate bases:
    b1 = r1*(b/(r1 + r2));
    b2 = r2*(b/(r1 + r2));

    // Find Areas:
    a1 = area(b1, h);
    a2 = area(b2, h);
    total = a1 + a2;


    // Output final area:
    cout<< fixed << setprecision(4) <<"Total Area is: "<<total<<" sq. units";

    return 0;
}

float area(float base, float height){
    // Declaring Variables:
    float dy, dx, interior_area, boundary_area, A, q;
    int total_y_steps;

    // Initialising Variables:
    q = 0.0;
    dy = 0.0001;
    dx  = (base/height)*dy;
    total_y_steps = height/dy;
    interior_area = 0.0;
    boundary_area = 0.0;
    A = 0.0;

    // Loop to sum areas of discrete elements:
    for (int i = 1; i <= total_y_steps; i++) {
        q = static_cast<float>(i);
        interior_area += dy*(base - q*dx);
        boundary_area += 0.5*(dy*dx);
    }

    // Calculating total area:
    A = interior_area + boundary_area;

    // Output:
    return A;
}
