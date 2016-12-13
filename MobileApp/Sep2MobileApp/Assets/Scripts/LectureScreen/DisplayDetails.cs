using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class DisplayDetails : MonoBehaviour {
	//Lecture screen details
	public Text mSubjectName;
	// Use this for initialization
	void Start () {
		//should go to onenable

	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void SetDemo()
	{
		Debug.Log (AppCommon.mSubjectName);
		mSubjectName.text = AppCommon.mSubjectName;
	}
}
