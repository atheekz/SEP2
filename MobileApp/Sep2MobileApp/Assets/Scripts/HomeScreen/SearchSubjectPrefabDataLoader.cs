using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using MaterialUI;
public class SearchSubjectPrefabDataLoader : MonoBehaviour {
	private string mSubjectName = "Software Engineering Project";
	private string mLecturerName = "Mr. Tharindu Perera";
	private string mTime = "8.00 - 10.00 am";
	private string mLocation = "A502";
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void SetDetailsOnPrefab(string subject,string lecturer,string time,string location)
	{
		mSubjectName = subject;
		mLecturerName = lecturer;
		mTime = time;
		mLocation = location;
	}


	public void DisplayEnrollingDialogBox()
	{
		GetPublicObjects.mEnrolmentDialogBox.SetActive (true);
		GetPublicObjects.mScriptHolder.GetComponent<EnrollingDialogBoxHandler>().DisplayDetails(mSubjectName, mLecturerName, mLocation,mTime);
	}


}
