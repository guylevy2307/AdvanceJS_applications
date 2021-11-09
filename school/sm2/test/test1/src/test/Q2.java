package test;

public class Q2 {
	
	public static double px(double x, double[] vec){
		int count=0;
		for(int i=0;i<vec.length;i++)
			if(x==vec[i])
				count++;
		return (double)count/vec.length;
	}
	
	public static double log2(double x){
		return Math.log10(x)/Math.log10(2);
	}
	

	public static double OPT_Hx(double[] vec){
		return 0;		
	}
}
