/**
 * 
 */
package com.pandorasoft.sprint.boot.backend.apirest.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * @author Erik Darío Hernández Vásquez. <b>erikdhv@gmail.com<b>
 * @version
 * {@summary The class contains the methods necessary to provide general date, time, 
 *  and calendar data, as well as the required date operations.}
 *
 */
public class Times {
	
	/**
	 * 
	 * @param format
	 * @return String
	 */
	public String getTimeStamp( String format ) {
		// Set the default format for time and date
		String formatDefault = "yyyy-MM-dd hh:mm:ss";
		
		// Set the default format
		SimpleDateFormat sdf = new SimpleDateFormat( format.length()>0 ? format: formatDefault);
		
		// Set the date in Gregorian format
		Calendar calendar = GregorianCalendar.getInstance();
		
		return sdf.format(calendar.getTime());
	}

}
