#include <iostream>
#include <fstream>

using namespace std;

// Function Prototypes:
void input_parser();
void TDMSA();
double cubic_interp(double, int);


// Global Variables:
double X[21], Y[21], dd_y[21];

int main(){

    // Declaring Variables:
    double ans[41][2], x;

    // Initialising Variables:
    x = 0;

    // Parsing input:
    input_parser();

    // Set boundaries of y'' here:
    dd_y[0] = 0;
    dd_y[20] = 0;

    // Solving for y''
    TDMSA();

    // Piece-wise Cubic Interpolation:
    for (int i = 0; i < 20; i++){

        ans[2*i][0] = X[i];
        ans[2*i][1] = Y[i];

        ans[2*i + 1][0] = X[i] + 1.0/3.0;
        ans[2*i + 1][1] = cubic_interp((i + 1.0/3.0), i);

    }

    ans[40][0] = X[20];
    ans[40][1] = Y[20]; 


    // Writing Output to File:
    ofstream oStream;
    oStream.open("Cubic_output.txt");

    for (int i = 0;  i < 41; i++)
    {
        oStream << ans[i][0] << " " << ans[i][1] << endl;

    }
    
    oStream.close();

    return 0;
}

void input_parser(){
    
    double number;
    ifstream iStream;
    iStream.open("data.txt");
    
    for (int i = 0;  i < 21; i++)
    {
        iStream >> number;
        X[i] = number;

        iStream >> number;
        Y[i] = number;
    }
    
    iStream.close();
    
}

void TDMSA(){

    // Declaring variables:
    double a[19], b[19], c[19], d[19];

    // Generating the coefficient series
    for (int i = 1; i < 20; i++){

        a[i-1] =  (X[i] - X[i-1])/6;

        b[i-1] = (X[i+1] - X[i-1])/3;

        c[i-1] = (X[i+1] - X[i])/6;

        d[i-1] = (((Y[i+1]-Y[i])/(X[i+1]-X[i])) - ((Y[i]-Y[i-1])/(X[i]-X[i-1])));

    }

    d[0] -= a[0]*dd_y[0];
    d[18] -= c[18]*dd_y[20];


    // Forward Elimination:
    c[0] = c[0]/b[0];
    d[0] = d[0]/b[0];

    for (int i = 1; i < 19; i++){

        c[i] = (c[i])/(b[i] - c[i-1]*a[i]);

        d[i] = (d[i] - d[i-1]*a[i])/(b[i] - c[i-1]*a[i]);

    }

    // Backward Substitution:
    dd_y[19] = d[18];
    for (int i = 17; i >= 0; i--){

        dd_y[i+1] = d[i] - c[i]*dd_y[i+2];

    }

}

double cubic_interp(double x, int i)
{
    double result, A, B, C, D;

    result = 0;
    A = 0;
    B = 0;
    C = 0;
    D = 0;

    A = (X[i+1] - x)/(X[i+1] - X[i]);

    B = (x - X[i])/(X[i+1] - X[i]);

    C = (1.0/6.0)*(A*(A*A) - A)*((X[i+1] - X[i])*(X[i+1] - X[i]));

    D = (1.0/6.0)*(B*(B*B) - B)*((X[i+1] - X[i])*(X[i+1] - X[i]));

    result = A*Y[i] + B*Y[i+1] + C*dd_y[i] + D*dd_y[i+1];

    return result;
}
