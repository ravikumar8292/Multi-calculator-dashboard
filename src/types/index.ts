export type CalculatorType = 
  | 'normal'
  | 'scientific'
  | 'percentage'
  | 'currency'
  | 'length'
  | 'weight'
  | 'temperature'
  | 'bigha-katha'
  | 'katha-squarefeet'
  | 'acre-hectare'
  | 'squaremeter-squarefeet'
  | 'emi'
  | 'interest'
  | 'gst'
  | 'discount'
  | 'bmi'
  | 'calories'
  | 'age';

export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  calculators: CalculatorItem[];
}

export interface CalculatorItem {
  id: CalculatorType;
  name: string;
  description: string;
  component: React.ComponentType<any>;
}
