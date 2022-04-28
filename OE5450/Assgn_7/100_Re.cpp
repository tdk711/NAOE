///////////// OE5450 Assignment-7 ///////////////
////// Lid-Driven Cavity: SIMPLE Algorithm ////
////// Dilip Kumar NA18B004 | Spring 2022 //////

#include <iostream>
#include <fstream>
#include <cmath>
#define n 128

using namespace std;

int main ()
{
    // Declare Variables:
	double u[n][n+1], un[n][n+1], uc[n] [n];
	double v[n+1][n], vn[n+1][n], vc[n][n];
	double p[n+1][n+1], pn[n+1][n+1], pc[n][n];
	double m[n+1][n+1];
	int i, j, step;
	double dx, dy, dt, tau, delta, error, Re;
	step = 1;
	dx = 1.0/(n-1);
	dy = 1.0/(n-1);
	dt = 0.001;
	delta = 4.5;
	error = 1.0;
	Re = 100.0;

	
	// Initialize Variables:
    for (i=0; i<=(n-1); i++)
    {
        for (j=0; j<=(n); j++)
        {
            u[i][j] = 0.0;
            u[i][n] = 1.0;
            u[i][n-1] = 1.0;
        }
    }
    
    for (i=0; i<=(n); i++)
    {
        for (j=0; j<=(n-1); j++)
        {
            v[i][j] = 0.0;
        }
    }
    
    for (i=0; i<=(n); i++)
    {
        for (j=0; j<=(n); j++)
        {
            p[i][j] = 1.0;
        }
    }
	
	while (error > 1e-9)
	{
		// X-Momentum Equation:
		for (i=1; i<=(n-2); i++)
		{
			for (j=1; j<=(n-1); j++)
			{
				un[i][j] = u[i][j] - dt*(  (u[i+1][j]*u[i+1][j]-u[i-1][j]*u[i-1][j])/2.0/dx 
							+0.25*( (u[i][j]+u[i][j+1])*(v[i][j]+v[i+1][j])-(u[i][j]+u[i][j-1])*(v[i+1][j-1]+v[i][j-1]) )/dy  )
								- dt/dx*(p[i+1][j]-p[i][j]) 
									+ dt*1.0/Re*( (u[i+1][j]-2.0*u[i][j]+u[i-1][j])/dx/dx +(u[i][j+1]-2.0*u[i][j]+u[i][j-1])/dy/dy );
			}
		}
		
		// Assign BCs to U
		for (j=1; j<=(n-1); j++)
		{
			un[0][j] = 0.0;
			un[n-1][j] = 0.0;
		}
		
		for (i=0; i<=(n-1); i++)
		{
			un[i][0] = -un[i][1];
			un[i][n] = 2 - un[i][n-1];
		}
		
		
		// Y-Momentum Equation
		for (i=1; i<=(n-1); i++)
		{
			for (j=1; j<=(n-2); j++)
			{
				vn[i][j] = v[i][j] - dt* ( 0.25*( (u[i][j]+u[i][j+1])*(v[i][j]+v[i+1][j])-(u[i-1][j]+u[i-1][j+1])*(v[i][j]+v[i-1][j]) )/dx 
							+(v[i][j+1]*v[i][j+1]-v[i][j-1]*v[i][j-1])/2.0/dy ) 
								- dt/dy*(p[i][j+1]-p[i][j]) 
									+ dt*1.0/Re*( (v[i+1][j]-2.0*v[i][j]+v[i-1][j])/dx/dx+(v[i][j+1]-2.0*v[i][j]+v[i][j-1])/dy/dy );
			}
		}
		
		// Assign BCs to v
		for (j=1; j<=(n-2); j++)
		{
			vn[0][j] = -vn[1][j];
			vn[n][j] = -vn[n-1][j];
		}		

		for (i=0; i<=(n); i++)
		{
			vn[i][0] = 0.0;
			vn[i][n-1] = 0.0;
		}		
	
		// Pressure Correction
		for (i=1; i<=(n-1); i++)
		{
			for (j=1; j<=(n-1); j++)
			{
				pn[i][j] = p[i][j]-dt*delta*(  ( un[i][j]-un[i-1][j] )/dx + ( vn[i][j]-vn[i][j-1] ) /dy  );
			}
		}
		
		
		// Pressure BCs
		for (i=1; i<=(n-1); i++)
		{
			pn[i][0] = pn[i][1];
			pn[i][n] = pn[i][n-1];
		}
		
		for (j=0; j<=(n); j++)
		{
			pn[0][j] = pn[1][j];
			pn[n][j] = pn[n-1][j];
		}		
		
		// Error Calculation:
		error = 0.0;
		
		for (i=1; i<=(n-1); i++)
		{
			for (j=1; j<=(n-1); j++)
			{
				m[i][j] = (  ( un[i][j]-un[i-1][j] )/dx + ( vn[i][j]-vn[i][j-1] )/dy  );
				error = error + fabs(m[i][j]);
			}
		}
		
		if (step%1000 ==1)
		{
	    printf("Error is %5.8lf for the step %d\n", error, step);
		}
		
		
		// Iterating u
		for (i=0; i<=(n-1); i++)
		{
			for (j=0; j<=(n); j++)
			{
				u[i][j] = un[i][j];
			}
		}
		
		// Iterating v
		for (i=0; i<=(n); i++)
		{
			for (j=0; j<=(n-1); j++)
			{
				v[i][j] = vn[i][j];
			}
		}
		
		// Iterating p
		for (i=0; i<=(n); i++)
		{
			for (j=0; j<=(n); j++)
			{
				p[i][j] = pn[i][j];
			}
		}

		step = step + 1;
	
	}
	
	for (i=0; i<=(n-1); i++)
	{
		for (j=0; j<=(n-1); j++)
		{	
			uc[i][j] = 0.5*(u[i][j]+u[i][j+1]);
			vc[i][j] = 0.5*(v[i][j]+v[i+1][j]);
			pc[i][j] = 0.25*(p[i][j]+p[i+1][j]+p[i][j+1]+p[i+1][j+1]);
		}
	}
	
    
	// Output:

	// 1.Pressure:
    ofstream oStream;
	oStream.open("output_p.txt");

	    for (int j = n-1;  j >= 0; j--)
    {
        for (int i = 0; i < n; i++){
            oStream << pc[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

	    // X velocity output:
    oStream.open("output_u.txt");

    for (int j = n-1;  j >= 0; j--)
    {
        for (int i = 0; i < n; i++){
            oStream << uc[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Y velocity output:
    oStream.open("output_v.txt");

    for (int j = n-1;  j >= 0; j--)
    {
        for (int i = 0; i < n; i++){
            oStream << vc[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Total velocity output:
    oStream.open("output_vel.txt");

    for (int j = n-1;  j >= 0; j--)
    {
        for (int i = 0; i < n; i++){
            oStream << sqrt(pow(uc[i][j],2) + pow(vc[i][j],2)) << " ";
        }
        oStream << endl;
    }
    oStream.close();

}
