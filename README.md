# Convex Hull Visualization
A simple visualization I made to showcase different convex hull algorithms such as graham scan, quick hull and divide & conquer.


## Usage
Just to make sure the controls is as simple as possible, all you as the user needs to do is click on the algorithm from the list at the top and let the javascript do the rest of the work. Once clicked the algorithm will begin executing. And only once the current execution is finished you the user will be allowed to choosen a different algorithm.   

**Please note that the time it takes for the visualization is in no way representative of the speed of the alogrithm as this has been slowed down to create a more appealing affect.**  

![instructions](https://user-images.githubusercontent.com/44118659/86421008-58e1af80-bca6-11ea-9d33-28f831034b05.gif)  



## Algorithms Used
Note that the time complexitiy of each alogithms is based on the number of inputs (n)

> ### Graham Scan  
> Time Complexity : O(nlogn)  
>  
> This algorithm finds all vertices of convex hull by going through all the points along the boundary. This algorithms uses the *stack* data structure to add and remove vertices during the convex hull calculation.

> ### Quick Hull  
> Time Complexity : O(nlogn)  
>  
> This alogrithm is very similar to the quicksort alogorithm and uses a divide and conquer approach for finding the convex hull. Althought, this alogirthm is quite efficient in cases of high symmetry it becomes very slow making it's time complexitity close to o(n^2)

> ### Divide & Conquer  
> Time Complexity : O(nlogn)  
>  
> This alogrithm works by dividing the set of inputs into smaller and smaller inputs until the convex hull of that small input is easily calculated. Once that is complete, the alogrithm goes on to find the upper and lower tangents of the two newly found convex hulls, and uses the tangents to merge the two convex hulls together creating a new convex hull. This process continues until there is no more convex hull left to be merged.

###### *by Nishanth Prajith*
