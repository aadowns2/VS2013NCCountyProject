using System;
using System.ComponentModel;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace NCCounty.Models
{
	public static class Extensions
	{
		#region DATETIME

		/// <summary>
		/// Converts an object to a nullable date time. Nulls will be handled.
		/// </summary>
		/// <param name="obj">The object to convert.</param>
		/// <returns>DateTime?</returns>
		public static DateTime? ToNullableDateTime(this object obj)
		{
			DateTime x = new DateTime();

			if (DateTime.TryParse(obj.ToString(), out x))
			{
				return x;
			}
			else
			{
				return (DateTime?)null;
			}
		}

		#endregion

		#region EXCEPTION

		/// <summary>
		/// Populates the exception with command parameter data.
		/// </summary>
		/// <param name="ex">The exception.</param>
		/// <param name="cmd">The Sql command object.</param>
		public static void PopulateExceptionWithCommandParameterData(this Exception ex, SqlCommand cmd)
		{
			if (cmd != null)
			{
				AddExceptionDataValue(ex, "CommandText", cmd.CommandText);
				AddExceptionDataValue(ex, "CommandType", cmd.CommandType.ToString());
				if (cmd.Connection != null) AddExceptionDataValue(ex, "ConnectionString", cmd.Connection.ConnectionString);
				if (cmd.Parameters != null)
				{
					int i = 0;
					foreach (SqlParameter parameter in cmd.Parameters)
					{
						AddExceptionDataValue(ex, "param" + i + " " + parameter.ParameterName, parameter.Value);
						i++;
					}
				}
			}
			else
			{
				AddExceptionDataValue(ex, "Additional Info: ", "Failed to create command object.");
			}
		}

		/// <summary>
		/// Adds data to an exception to help troubleshoot any problems, but first checks to make sure
		/// that the key does not already exist so a new exception won't get raised.
		/// </summary>
		/// <param name="ex">Exception to add data to</param>
		/// <param name="key">Data Key</param>
		/// <param name="value">Data value</param>
		public static void AddExceptionDataValue(this Exception ex, object key, object value)
		{

			if (!ex.Data.Contains(key))
			{
				ex.Data.Add(key, value.ToNullSafeString());
			}
		}
		#endregion

		#region SqlCOMMAND

		/// <summary>
		/// DbCommand extension to execute the reader and capture more 
		/// detail in the exception.
		/// </summary>
		/// <param name="cmd"></param>
		public static SqlDataReader ExecuteReaderExtended(this SqlCommand cmd)
		{
			try
			{
				return cmd.ExecuteReader();
			}
			catch (Exception ex)
			{
				ex.PopulateExceptionWithCommandParameterData(cmd);
				throw;
			}
		}

		/// <summary>
		/// DbCommand extension to execute a non query and capture more 
		/// detail in the exception.
		/// </summary>
		/// <param name="cmd"></param>
		public static int ExecuteNonQueryExtended(this SqlCommand cmd)
		{
			try
			{
				return cmd.ExecuteNonQuery();
			}
			catch (Exception ex)
			{
				ex.PopulateExceptionWithCommandParameterData(cmd);
				throw;
			}
		}

		/// <summary>
		/// DbCommand extension to execute scalar and capture more 
		/// detail in the exception.
		/// </summary>
		/// <param name="cmd"></param>
		public static object ExecuteScalarExtended(this SqlCommand cmd)
		{
			try
			{
				return cmd.ExecuteScalar();
			}
			catch (Exception ex)
			{
				ex.PopulateExceptionWithCommandParameterData(cmd);
				throw;
			}
		}

		#endregion


		#region SqlPARAMETERCOLLECTION

		/// <summary>
		/// Adds a value to the end of the System.Data.SqlClient.SqlParameterCollection.
		/// </summary>
		/// <param name="target"></param>
		/// <param name="parameterName"></param>
		/// <param name="value"></param>
		/// <param name="required">Parameter is required by stored procedure.</param>
		/// <returns></returns>
		public static SqlParameter AddWithValue(this SqlParameterCollection target, string parameterName, object value, bool required)
		{
			if (!string.IsNullOrWhiteSpace(value.ToNullSafeString()) || required)
			{
				return target.AddWithValue(parameterName, value ?? DBNull.Value);
			}
			else
			{
				return target.AddWithValue(parameterName, null);
			}
		}

		#endregion

		#region STRING

		/// <summary>
		/// Converts an object to a string. Nulls will be handled with an empty string.
		/// </summary>
		/// <param name="obj">The object to convert.</param>
		/// <returns>string</returns>
		public static string ToNullSafeString(this object obj)
		{
			return (obj ?? string.Empty).ToString();
		}

		#endregion

		public static decimal? ToNullableDecimal(this object obj)
		{
			if (obj is DBNull ||
				obj == null)
			{
				return null;
			}
			if (obj is string &&
				((string)obj).Length == 0)
			{
				return null;
			}
			return Convert.ToDecimal(obj);
		}

		#region Change Type

		public static U ChangeType<U>(this object source, U returnValueIfException)
		{
			try
			{
				return source.ChangeType<U>();
			}
			catch
			{
				return returnValueIfException;
			}
		}

		public static U ChangeType<U>(this object source)
		{
			if (source is U)
				return (U)source;

			var destinationType = typeof(U);
			if (destinationType.IsGenericType && destinationType.GetGenericTypeDefinition() == typeof(Nullable<>))
				destinationType = new NullableConverter(destinationType).UnderlyingType;

			return (U)Convert.ChangeType(source, destinationType);
		}
		#endregion

		#region Exception.ToLogString
		/// <summary>
		/// <para>Creates a log-string from the Exception.</para>
		/// </summary>
		/// <param name="ex">The exception to create the string from.</param>
		/// <param name="additionalMessage">Additional message to place at the top of the string, maybe be empty or null.</param>
		/// <returns></returns>
		public static string ToLogString(this Exception ex, string additionalMessage)
		{
			const string fileName = @"C:\ErrorLog\";

			Directory.CreateDirectory(Path.GetDirectoryName(fileName));

			StringBuilder msg = new StringBuilder();

			if (!string.IsNullOrEmpty(additionalMessage))
			{
				msg.Append(DateTime.Now.ToShortTimeString());
				msg.Append(Environment.NewLine);
				msg.Append(additionalMessage);
				msg.Append(Environment.NewLine);
			}

			if (ex != null)
			{
				Exception orgEx = ex;
				msg.Append("Exception ");
				while (orgEx != null)
				{
					msg.Append(orgEx.Message);
					orgEx = orgEx.InnerException;
					msg.Append(Environment.NewLine);
				}

				if (ex.Data != null)
				{
					foreach (object i in ex.Data)
					{
						msg.Append("Data:");
						msg.Append(i.ToString());
						msg.Append(Environment.NewLine);
					}
				}

				if (ex.StackTrace != null)
				{
					msg.Append("StackTrace:");
					msg.Append(ex.StackTrace.ToString());
					msg.Append(Environment.NewLine);
				}

				if (ex.Source != null)
				{
					msg.Append("Source:  ");
					msg.Append(ex.Source);
					msg.Append(Environment.NewLine);
				}

				if (ex.TargetSite != null)
				{
					msg.Append("TargetSite:  ");
					msg.Append(ex.TargetSite.ToString());
					msg.Append(Environment.NewLine);
				}

				Exception baseException = ex.GetBaseException();
				if (baseException != null)
				{
					msg.Append("BaseException:  ");
					msg.Append(ex.GetBaseException());
				}
			}
			return msg.ToString();
		}
		#endregion Exception.ToLogString
	}
}