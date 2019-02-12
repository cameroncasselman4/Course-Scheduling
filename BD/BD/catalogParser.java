/*
Matthew Blair
2/15/17
Parsing a text file containing the scraped data from the SJFC catalog
*/

import java.util.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Collections;

public class catalogParser
{
	public static void main(String[] args)
	{
		File catalogFile = new File("catalog.txt");
		File typeFile = new File ("type.txt");
		File abClassNameFile = new File("abClassName.txt");
		File uniClassPrefixFile = new File("uniClassPrefix.txt");
		File restrictionsFile = new File("restrictions.txt");
		File crnFile = new File("crn.txt");
		File classNameFile = new File("className.txt");
		File creditsFile = new File("credits.txt");
		File daysWithTimeFile = new File("daysWithTime.txt");
		File dateStartFile = new File("dateStart.txt");
		File dateEndFile = new File("dateEnd.txt");
		File roomFile = new File("room.txt");
		File termFile = new File("term.txt");
		File profNameFile = new File("profName.txt");
		File capacityFile = new File("capacity.txt");
		File seatsAvailFile = new File("seatsAvail.txt");
		
		String line = ""; //String value of the current line
		boolean end = false; //Boolean that controls the termination of the program
		boolean moreDays = false; //Boolean that keeps track if the class has more than one date
		boolean cancelled = false; //Boolean that keeps track if a class is cancelled
		boolean first1 = true; //Boolean that keeps track if this is the first data entry of this type
		boolean first2 = true;
		boolean first3 = true;
		int count = 0; //Counts how many new tags were found
		String s1 = "";
		
		while (end == false)
		{
			try
			{
				
				PrintWriter abClassNameWriter = new PrintWriter(abClassNameFile, "UTF-8");
				PrintWriter uniClassPrefixWriter = new PrintWriter(uniClassPrefixFile, "UTF-8");
				PrintWriter typeWriter = new PrintWriter(typeFile, "UTF-8");
				PrintWriter restrictionsWriter = new PrintWriter(restrictionsFile, "UTF-8");
				PrintWriter crnWriter = new PrintWriter(crnFile, "UTF-8");
				PrintWriter classNameWriter = new PrintWriter(classNameFile, "UTF-8");
				PrintWriter creditsWriter = new PrintWriter(creditsFile, "UTF-8");
				PrintWriter daysWithTimeWriter = new PrintWriter(daysWithTimeFile, "UTF-8");
				PrintWriter datesWriter = new PrintWriter(dateStartFile, "UTF-8");
				PrintWriter roomWriter = new PrintWriter(roomFile, "UTF-8");
				PrintWriter termWriter = new PrintWriter(termFile, "UTF-8");
				PrintWriter profNameWriter = new PrintWriter(profNameFile, "UTF-8");
				PrintWriter capacityWriter = new PrintWriter(capacityFile, "UTF-8");
				PrintWriter seatsAvailWriter = new PrintWriter(seatsAvailFile, "UTF-8");

				List<String> abClassNameList = new ArrayList<String>();
				List<String> uniClassPrefixList = new ArrayList<String>();
				List<String> typeList = new ArrayList<String>(); 
				List<String> restrictionsList = new ArrayList<String>();
				List<String> crnList = new ArrayList<String>();
				List<String> classNameList = new ArrayList<String>();
				List<String> creditsList = new ArrayList<String>();
				List<String> daysWithTimeList = new ArrayList<String>();
				List<String> datesList = new ArrayList<String>();
				List<String> roomList = new ArrayList<String>();
				List<String> termList = new ArrayList<String>();
				List<String> profNameList = new ArrayList<String>();
				List<String> capacityList = new ArrayList<String>();
				List<String> seatsAvailList = new ArrayList<String>();
				
				Scanner input = new Scanner(catalogFile);
				
				while(input.hasNextLine())
				{
					while(!line.contains("Course/Section"))
					{
						line = input.nextLine();
					}
					
					line = input.nextLine();
					
					if (line.equals(""))
						line = input.nextLine();
					
					//System.out.println(count + " " + line);
					
					while(!line.contains("Results for"))
					{	
						//System.out.println(count + " " + line);
						String[] split = line.split("\\s+");
						//System.out.println("1: " + split[0] + " 2: " + split[1]);
						//Abbreviated Class Name, Class Prefix List (doesn't become unique until printed to file), CRN, and Restrictions
						
						//if contains neither
						if(!split[0].contains("restrictions") && !split[0].contains("prerequisite"))
						{	
							abClassNameList.add(split[0]);
							uniClassPrefixList.add(split[0].substring(0, 4));
							crnList.add(split[1]);
							restrictionsList.add("");
							
							try
							{
								typeList.add(split[2]);
							}
							catch (ArrayIndexOutOfBoundsException e)
							{
								typeList.add("");
							}
						}
						//if contains both
						else if(split[0].contains("restrictions") && split[1].contains("prerequisite"))
						{	
							s1 = split[0].substring(0, split[0].indexOf("res"));
							abClassNameList.add(s1);
							uniClassPrefixList.add(s1.substring(0, 4));
							s1 = split[0].substring(split[0].indexOf("res"), split[0].indexOf("tions") + 5) + " " + split[1];
							restrictionsList.add(s1);
							crnList.add(split[3]);
							
							try
							{
								typeList.add(split[4]);
							}
							catch (ArrayIndexOutOfBoundsException e)
							{
								typeList.add("");
							}
						}	
						//if contains only restrictions
						else if(split[0].contains("restrictions"))
						{
							s1 = split[0].substring(0, split[0].indexOf("res"));
							abClassNameList.add(s1);
							uniClassPrefixList.add(s1.substring(0,4));
							s1 = split[0].substring(split[0].indexOf("res"), split[0].indexOf("tions") + 5);
							restrictionsList.add(s1);
							crnList.add(split[1]);
							
							try
							{
								typeList.add(split[2]);
							}
							catch (ArrayIndexOutOfBoundsException e)
							{
								typeList.add("");
							}
						}
						//if contains only prerequisite
						else
						{
							s1 = split[0].substring(0, split[0].indexOf("pre"));
							abClassNameList.add(s1);
							uniClassPrefixList.add(s1.substring(0,4));
							s1 = split[0].substring(split[0].indexOf("pre"), split[0].indexOf("site") + 4);
							restrictionsList.add(s1);
							crnList.add(split[2]);
							
							try
							{
								typeList.add(split[3]);
							}
							catch (ArrayIndexOutOfBoundsException e)
							{
								typeList.add("");
							}
						}
						
						//Class Name
						line = input.nextLine();
						//System.out.println(line);
						classNameList.add(line);

						//Spacing
						if(line.contains("Cancelled"))
							cancelled = true;
						else
						{
							line = input.nextLine();
							line = input.nextLine();
							if(line.length() > 9 || !line.matches(".*[0-9].*"))
							{	
								//System.out.println("TRIGGER");
								line = input.nextLine();
								line = input.nextLine();
							}
						}
						
						//If it is a cancelled class, it skips from credits to Seats available
						//Credits
						if (cancelled == true)
						{
							line = input.nextLine();
							line = input.nextLine();
							//System.out.println("---> " + line);
							
							if(!line.matches(".*[0-9].*") || line.contains(",") || line.length() > 10)
							{
								line = input.nextLine();
								line = input.nextLine();
							}

							split = line.split("\\s+");
							creditsList.add(split[0]);
							termList.add(split[1]);
							capacityList.add(split[2]);
							seatsAvailList.add(split[3]);
							
							//Putting in blanks for cancelled classes
							daysWithTimeList.add("");
							datesList.add("");
							roomList.add("");
							profNameList.add("");
							//System.out.println("TRIGGER");
						}
						else
						{	
							creditsList.add(line);
							
							line = input.nextLine();
							//System.out.println("--> " + line);
							//If the catalog contains 1 or more sets of dates and rooms...
							while (line.contains(":") || line.length() > 3 || ((line.contains("T") || line.contains("M") || line.contains("W") || line.contains("F") || line.contains("R")) && line.length() <= 3))
							{
								//Days with time
								//System.out.println("Days W/ Time: " + line);
								if (first1 == true)
								{	
									if (line.contains(":") || ((line.contains("T") || line.contains("M") || line.contains("W") || line.contains("F") || line.contains("R")) && line.length() <= 3))
									{
										daysWithTimeList.add(line);
										line = input.nextLine();
										first1 = false;
									}
									else
									{
										daysWithTimeList.add("");
										first1 = false;
									}
								}
								else
								{
									if(line.contains(":") || ((line.contains("T") || line.contains("M") || line.contains("W") || line.contains("F") || line.contains("R")) && line.length() <= 3))
									{
										s1 = daysWithTimeList.get(daysWithTimeList.size() - 1);
										daysWithTimeList.remove(daysWithTimeList.size() - 1);
										daysWithTimeList.add(s1 + " & " + line);
									
										line = input.nextLine();
									}
								}
								
								//System.out.println("Dates: " + line);
								//Dates
								if (first2 == true)
								{	
									if ((line.matches(".*[A-Z].*") && line.matches(".*\\d+.*")))
									{	
										datesList.add(line);
										line = input.nextLine();
										first2 = false;
									}
								}
								else
								{
									if ((line.matches(".*[A-Z].*") && line.matches(".*\\d+.*")))
									{
										s1 = datesList.get(datesList.size() - 1);
										datesList.remove(datesList.size() - 1);
										datesList.add(s1 + " & " + line);
									
										line = input.nextLine();
									}
								}
								
								s1 = "";
								
								//System.out.println("Rooms: " + line);
								//Rooms
								if (first3 == true)
								{
									//If the line has letters and numbers and larger than 3 characters, or is off campus or in Michaelhouse
									if((line.matches(".*[A-Z].*") && line.matches(".*\\d+.*") && line.length() > 3 && !line.contains("\t")) || line.contains("OFF CAMPUS") || line.contains("MI PERF ARTS") || line.contains("TBA") || line.contains("CMPCTR"))
									{
										roomList.add(line);
										line = input.nextLine();
										first3 = false;
									}
									else
									{
										roomList.add("");
										//System.out.println("TRIGGER 1");
									}
								}
								else
								{
									if((line.matches(".*[A-Z].*") && line.matches(".*\\d+.*") && line.length() > 3 && !line.contains("\t")) || line.contains("OFF CAMPUS") || line.contains("MI PERF ARTS") || line.contains("TBA") || line.contains("CMPCTR"))
									{
										s1 = roomList.get(roomList.size() - 1);
										roomList.remove(roomList.size() - 1);
										roomList.add(s1 + " & " + line);
										line = input.nextLine();
									}
								}
								
								//if the next line does not contain any lower-case letters and contains a tab, exit the while loop (because if the teacher slot is blank it changes the format)
								//System.out.println("-->" + line);
								if (!line.matches(".*[a-z].*") && line.contains("\t"))
								{
									//System.out.println("TIGGER");
									break;
								}
							}
						
							first1 = true;
							first2 = true;
							first3 = true;
							s1 = "";
							
							//Term
							split = line.split("\\s+");
							termList.add(split[0]);
							
							//Format changes if prof space is blank
							if (split.length > 1)
							{
								profNameList.add("");
								capacityList.add(split[1]);
								seatsAvailList.add(split[2]);
							}
							else
							{	
								//Professor Name
								//System.out.println("line --->" + line);
								line = input.nextLine();
								//System.out.println("line ---->" + line);
								
								s1 = "";
								
								while (!line.matches(".*\\d+.*"))
								{
									if(line.matches(".*[a-z].*") && s1.equals(""))
										s1 += line;
									else if (line.matches(".*[a-z].*"))
										s1 += " & " + line;
									
									line = input.nextLine();
								}
								
								profNameList.add(s1);
								//Capacity and Seats Available
								split = line.split("\\t+");
								capacityList.add(split[0]);
								seatsAvailList.add(split[1]);
							}
						}
						
						cancelled = false;
						try
						{
							line = input.nextLine();
							if (line.equals("Back to Top"))
							{
								//System.out.println("END");
								end = true;
								break;
							}
						}
						catch(NoSuchElementException e)
						{
							//System.out.println("END?");
							end = true;
							break;
						}
						//System.out.println(count + " " + line);
						count++;
						//System.out.println(count + "\n");
					}
					if (end == true)
						break;
				}
				printList(abClassNameList, abClassNameWriter);
				printUniList(uniClassPrefixList, uniClassPrefixWriter);
				printList(typeList, typeWriter);
				printList(restrictionsList, restrictionsWriter);
				printList(crnList, crnWriter);
				printList(classNameList, classNameWriter);
				printList(creditsList, creditsWriter);
				printList(daysWithTimeList, daysWithTimeWriter);
				printList(datesList, datesWriter);
				printList(roomList, roomWriter);
				printList(termList, termWriter);
				printList(profNameList, profNameWriter);
				printList(capacityList, capacityWriter);
				printList(seatsAvailList, seatsAvailWriter);
			}
			catch(FileNotFoundException e)
			{
				e.printStackTrace();
			}
			catch(UnsupportedEncodingException e)
			{
				e.printStackTrace();
			}
		}
	}
	
	//Prints Lists
	public static void printList(List<String> list, PrintWriter w)
	{
		int x;
		for(x = 0; x < list.size(); x++)
			w.println(list.get(x));
		
		w.close();
	}
	
	//Prints List indexes that are only unique (assuming they're in alphabetical order)
	public static void printUniList(List<String> list, PrintWriter w)
	{
		int x;
		String s1;
		String s2;
		
		//print blank space for selection purposes
		w.println("");
		
		//print the first element
		w.println(list.get(0));
		
		//compare the rest if the elements
		for(x = 1; x < list.size(); x++)
		{
			s1 = (list.get(x - 1));
			s2 = (list.get(x));
			
			if (!s1.equals(s2))
				w.println(list.get(x));
		}
		
		w.close();
	}
}