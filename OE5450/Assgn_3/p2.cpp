#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){

    // Declare Variables
    double T_k[101][101], T_k1[101][101], Q[101][101], T_x, T_y, sum, e, delta;
    const int m = 101;
    double error = 0.0001;
    int coi;

    //Initialising Variables:
    for (int i = 0;  i < m; i++)
    {
        for (int j = 0; j < m; j++){
            T_k[i][j] = 0;
            T_k1[i][j] = 0;
            Q[i][j] = 0;
        }

    }

    T_x = 0.00;
    T_y = 0.00;
    e = 0.00;
    sum = 0.00;
    delta = 0.00;
    coi = 0;

    // Magnitude of Discrete Step:
    delta = 10.0/static_cast<double>(m-1);
    cout<<"Step Size: "<<delta<<endl;


    // Boundary Conditions:
    for(int i = 0; i < m; i++){

        T_k[i][0] = 40.0;
        T_k1[i][0] = 40.0;


        T_k[0][i] = 40.0;
        T_k1[0][i] = 40.0;

    }

    T_x = 10.00;
    T_y = 1.00;

    // Sources and Sinks:
    Q[(2*(m-1))/5][(m-1)/2] = 1.00;
    Q[(4*(m-1))/5][(m-1)/5] = 1.00;


    do
    {
        coi++;
        sum = 0;
        
        for (int i = 0;  i < m; i++)
        {
            for (int j = 0; j < m; j++){

                T_k[i][j] = T_k1[i][j];
            
            }

        }

        // Gauss-Seidel Iteration:

        // Interior Elements
        for (int i = 1;  i < m-1; i++)
        {
            
            for (int j = 1; j < m-1; j++){

                T_k1[i][j] = (0.25)*(T_k1[i+1][j] + T_k1[i-1][j] + T_k1[i][j+1] + T_k1[i][j-1] - Q[i][j]*(delta*delta));
            
            }

        }

        // Right Boundary:
        for (int j = 1; j < m; j++){

            T_k1[m-1][j] = (0.25)*(2.0*(T_x*delta) + T_k1[m-1][j] + T_k1[m-2][j] + T_k1[m-1][j+1] + T_k1[m-1][j-1] - Q[m-1][j]*(delta*delta));

        }

        // Top Boundary:
        for (int i = 1; i < m; i++){

            T_k1[i][m-1] = (0.25)*(2.0*(T_y*delta) + T_k1[i][m-2] + T_k1[i+1][m-1] + T_k1[i-1][m-1] + T_k1[i][m-2] - Q[i][m-1]*(delta*delta));

        }

        // Top-Right Corner Element:
        T_k1[m-1][m-1] = (0.25)*(T_k1[m-2][m-1] + T_k1[m-1][m-2] + 2.0*(T_x*delta) + T_k1[m-2][m-1] + 2.0*(T_y*delta) + T_k1[m-1][m-2] - Q[m-1][m-1]*(delta*delta));

        // Error:
        for (int i = 1;  i < m; i++)
        {
            for (int j = 1; j < m; j++){

                sum += pow((T_k1[i][j] - T_k[i][j]),2);

            }

        }

        e = sqrt(sum);
    } while (e > error);
    cout<<"Number of Iterations: "<<coi;
   

    // Writing Output to File:
    ofstream oStream;
    oStream.open("output_2.txt");

    for (int i = m-1;  i >= 0; i--)
    {
        for (int j = 0; j < m; j++){
            oStream << T_k1[j][i] << " ";
        }

        oStream << endl;
    }
    
    oStream.close();
    return 0;
}
