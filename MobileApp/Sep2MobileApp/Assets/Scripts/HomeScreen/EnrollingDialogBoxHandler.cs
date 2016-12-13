using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using MaterialUI;
public class EnrollingDialogBoxHandler : MonoBehaviour {

	public Text mEnrolmentKeyValue;
	public Text mMessage;
	public GameObject mEnrolmentKeyInputField;
	public GameObject mOkButton;
	public GameObject mEnrolmentDialogBox;
	private string mSubjectName;
	private string mLecturerName;
	private string mTime;
	private string mLocation;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void DisplayDetails(string SubjectName, string LecturerName, string Location,string lTime)
	{
		mSubjectName = SubjectName;
		mLecturerName = LecturerName;
		mTime = lTime;
		mLocation = Location;
		mMessage.text = "You are about to Enroll to "+SubjectName+" of "+LecturerName+" on "+Location+" at "+lTime+"\n Please Enter the Enrolment Key below and press OK";
		mEnrolmentKeyInputField.SetActive (true);
		mOkButton.SetActive (true);
	}

	public void VerifyEnrolment()
	{
		string key = mEnrolmentKeyValue.text;
		mMessage.text = "Verifying Enrolment Key...... Please Wait....";
		mEnrolmentKeyInputField.SetActive (false);
		mOkButton.SetActive (false);

		StartCoroutine (ValidateEnrolmentKey(key));
	}

	private IEnumerator ValidateEnrolmentKey(string key)
	{
		yield return new WaitForSeconds (2f);

		if (key.Equals("lol")) {
			mEnrolmentKeyInputField.GetComponent<InputField> ().text = "";
			mEnrolmentDialogBox.SetActive (false);

			SetDetailsOfAppCommon ();
			GetPublicObjects.mScriptHolder.GetComponent<ScreenManager> ().SetScreen ("Lecture");
			GetPublicObjects.mScriptHolder.GetComponent<DisplayDetails> ().SetDemo ();
		} 
		else 
		{
			mMessage.text = "Sorry! the key you entered is not right. Please try again";
			mEnrolmentKeyInputField.SetActive (true);
			mOkButton.SetActive (true);
		}

	}

	private void SetDetailsOfAppCommon()
	{
		AppCommon.mLecturerName = mLecturerName;
		AppCommon.mLocation = mLocation;
		AppCommon.mSubjectName = mSubjectName;
		AppCommon.mTime = mTime;
	}

	public void CloseDialogBox()
	{
		mEnrolmentDialogBox.SetActive (false);
	}
}
